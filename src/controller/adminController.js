
const mongoose = require('mongoose');
const ENV = process.env;
const axios = require('axios');
const https = require('https');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminController = {
    _genToken: (id) => {
        return jwt.sign({
            _id: id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24小时
        }, process.env.JWT_SECRET)
    },
    _login: async (username, password) => {
        const AdminModel = mongoose.model('Admin');
        const user = await AdminModel.findOne({ username });
        if (user) {
            let compareResult = await bcrypt.compare(password, user.hashPassword);
            if ( compareResult ) {
                return {
                    result: true,
                    username: user.username,
                    token: self._genToken(user._id),
                };
            } else return {
                result: false,
                message: 'username or password is not correct'
            }
        } else return {
            result: false,
            message: 'username or password is not correct'
        }
    },
    create: async(ctx, next) => {
        let { username, password } = ctx.request.body;
        const AdminModel = mongoose.model('Admin')
        const hashPassword = await bcrypt.hash(password, 10);
        let curUser = new AdminModel({
            username, hashPassword
        });
        const user = await curUser.save();

        const token = this._genToken(user._id);

        ctx.body = {
            success: true,
            result: {
                token,
                username: user
            }
        };
        
    },
    login: async (ctx, next) => {
        let { username, password } = ctx.request.body;
        const loginResult = await self._login(username, password);
        if (loginResult.result) {
            ctx.body = {
                success: true,
                result: {
                    token: loginResult.token,
                    username: loginResult.username
                }
            };
        } else {
            ctx.body = {
                success: false,
                result: {
                    message: loginResult.message
                }
            };
        }
    },
}
const self = adminController;
module.exports = adminController;