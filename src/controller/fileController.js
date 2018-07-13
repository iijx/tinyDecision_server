
const mongoose = require('mongoose');
const ENV = process.env;

module.exports = {
    
    getAll: async (ctx, next) => {
        let QuestionModel = mongoose.model('Question');
        let result = await QuestionModel.find();
        ctx.body = {
            success: true,
            result,
        }
    },
    get: async (ctx, next) => {
        let query = ctx.query;

        let QuestionModel = mongoose.model('Question');   
        let questionResult;
        if (query && query.id) {
            questionResult = await QuestionModel.find({
                uid: ctx.state._uid,
                _id: query.id
            })
        } else {
            questionResult = await QuestionModel.find({
                uid: ctx.state._uid,
            })

            questionResult.sort( (a, b) => {
                return a.meta.updated.getTime() <= b.meta.updated.getTime() ? 1 : -1;
            })
        }
        ctx.body = {
            success: true,
            result: questionResult
        }
    },
    create: async (ctx, next) => {
        let uid = ctx.state._uid;
        let { question, options, maxLotteryTimes = 1  } = ctx.request.body;
        let QuestionModel = mongoose.model('Question');
        // let UserModel = mongoose.model('User');

        let curQuestion = new QuestionModel({
            uid,
            question,
            options,
            maxLotteryTimes,
        });
        let questionResult = await curQuestion.save(); 
        // let userResult = await UserModel.findByIdAndUpdate(ctx.state._uid, {
        //     $push: {
        //         questionList: questionResult._id,
        //     }
        // })

        ctx.body = {
            success: true,
            result: questionResult
        }
    },
    update: async(ctx, next) => {
        const QuestionModel = mongoose.model('Question');
        let uid = ctx.state._uid;
        let body = ctx.request.body;

        let newResult = await QuestionModel.findOneAndUpdate({_id: body.id}, body, { new: true });
       
        ctx.body = {
            success: true,
            result: newResult
        }
    }
}