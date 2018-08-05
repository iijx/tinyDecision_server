
const mongoose = require('mongoose');
const randomInt = require('random-int');
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
        let MusicModel = mongoose.model('Music');

        let musicResult = await MusicModel.find();        
        ctx.body = {
            success: true,
            result: musicResult
        }
    },
    create: async (ctx, next) => {
        let { name, author, coverKey  } = ctx.request.body;
        let coverUrl = `https://${ENV.Qiniu_Domain}/${coverKey}`;

        let MusicModel = mongoose.model('Music');
        let curMusic = await new MusicModel({name, author, coverUrl}).save();

        ctx.body = {
            success: true,
            result: curMusic
        }
    },
    music_random: async (ctx, next) => {
        let MusicModel = mongoose.model('Music');
        let allMusic = await MusicModel.find();
        let { num = 1 } = ctx.query;
        let music = []
        for(let i = 0; i < num; i++ ) {
            music.push(allMusic[randomInt(0, allMusic.length - 1)]);
        }
        
        ctx.body = {
            success: true,
            result: music.map( item => ({
                music: item,
                lyricIndex: randomInt(0, item.lyricBlock.length - 1),
            }))
        }

    },
    addLyric: async(ctx, next) => {
        let { musicId, lyric } = ctx.request.body;
        let MusicModel = mongoose.model('Music');
        let curMusic = await MusicModel.findByIdAndUpdate(musicId, {
            $push: {
                lyricBlock: lyric
            }
        }, { new: true});
        ctx.body = {
            success: true,
            result: curMusic
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