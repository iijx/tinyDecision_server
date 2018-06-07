
const mongoose = require('mongoose');
const ENV = process.env;


function formatTpl_back2front(item) {
    return {
        id: item._id,
        question: item.question,
        options: item.options,
        meta: item.meta,
    }
}

module.exports = {
    get: async (ctx, next) => {
        const TplModel = mongoose.model('Tpl');
        let query = ctx.query;

        let tplResult;
        if (query && query.id) {
            tplResult = await TplModel.find({
                uid: ctx.state._uid,
                _id: query.id
            })
            tplResult = formatTpl_back2front(tplResult)
        } else {
            tplResult = await TplModel.find({
                uid: ctx.state._uid,
            })
            tplResult.sort((a, b) => {
                return a.meta.updated.getTime() <= b.meta.updated.getTime() ? 1 : -1;
            })
            console.log(tplResult);
            tplResult = tplResult.map(formatTpl_back2front);
            console.log(tplResult);
        }
        ctx.body = {
            success: true,
            result: tplResult
        }
    },
    create: async (ctx, next) => {
        const TplModel = mongoose.model('Tpl');

        let uid = ctx.state._uid;
        let { question, options, maxLotteryTimes = 1 } = ctx.request.body;

        let curTpl = new TplModel({
            uid,
            question,
            options,
            maxLotteryTimes,
        });
        let tplResult = await curTpl.save();

        ctx.body = {
            success: true,
            result: formatTpl_back2front( tplResult )
        }
    },
    update: async (ctx, next) => {
        const TplModel = mongoose.model('Tpl');
        let uid = ctx.state._uid;
        let body = ctx.request.body;

        let newResult = await TplModel.findOneAndUpdate({ _id: body.id }, body, { new: true });

        ctx.body = {
            success: true,
            result: formatTpl_back2front(newResult)
        }
        // let curTpl = new TplModel({
        //     uid,
        //     question,
        //     options,
        //     maxLotteryTimes,
        // });
        // let tplResult = await curTpl.save(); 

        // ctx.body = {
        //     success: true,
        //     result: tplResult
        // }
    }
}