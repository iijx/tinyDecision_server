
const mongoose = require('mongoose');
const ENV = process.env;
const axios = require('axios');
const https = require('https');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (ctx, next) => {
        let { code } = ctx.request.body;
        let result = {};
        try {
            result = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
                params: {
                    appid: ENV.WX_APPID,
                    secret: ENV.WX_SECRET,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            }).then(res => res.data);
        } catch (error) {
            result = error;
        }
        let UserModel = mongoose.model('User');
        let QuestionModel = mongoose.model('Question');
        let TplModel = mongoose.model('Tpl');
        
        let curUser = await UserModel.findOne({ openid: result.openid });
        if (!curUser) {
            // 新建用户
            curUser = new UserModel({
                openid: result.openid,
            })
            let user = await curUser.save();
            // 初始化默认问题
            initQuestion = new QuestionModel({
                uid: user._id,
                question: '明日，我们还会再见吗？',
                options: ['会', '不会'],
                maxLotteryTimes: -1,
                lotteriedTimes: 0,
            })
            await initQuestion.save();

            // 初始化默认模板
            let initTpl = new TplModel({
                uid: user._id,
                question: '明日，我们还会再见吗？',
                options: ['会', '不会'],
            })
            await initTpl.save();
        } else;
        let token = jwt.sign({
            _uid: curUser._id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 1小时
        }, process.env.JWT_SECRET)
        ctx.body = {
            success: true,
            result: {
                token,
            }
        };
    },

    get: async (ctx, next) => {
        let UserModel = mongoose.model('User');
        let users = await UserModel.find();
        ctx.body = {
            success: true,
            result: users,
        }
    }
}