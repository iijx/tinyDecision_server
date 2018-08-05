const mongoose = require('mongoose');
const ENV = process.env;


module.exports = {
    get: async function(ctx, next) {
        let RecordModal = mongoose.model('Record');
        let {musicId, lyricIndex} = ctx.query;

        if ( musicId && lyricIndex ) {
            const curRecords = await RecordModal.find({ musicId, lyricIndex});
            ctx.body = {
                success: true,
                result: curRecords
            }
        }
    },
    create: async function(ctx, next) {
        let Record = mongoose.model('Record');
        let File = mongoose.model('File');
        let User = mongoose.model('User');

        let { cat, fileName, fileType, filePath, poemId, musicId, lyricIndex } = ctx.request.body;
        let curFile = await new File({
            name: fileName,
            type: fileType,
            path: filePath,
        }).save();
        
        let curRecord = await new Record({
            authorOpenid: ctx.state._uid,
            cat,
            poemId, 
            musicId,
            lyricIndex,
            fileId: curFile._id,
        }).save();

        let curUser = await User.findById(ctx.state._uid);
        ctx.body = {
            success: true,
            result: {
                cat: curRecord.cat,
                fileId: curRecord.fileId,
                id: curRecord._id,
                likeNum: curRecord.likeNum,
                playNum: curRecord.playNum,

                name: curFile.fileName,
                path: curFile.filePath,
                author: {
                    avatarUrl: curUser.avatar || '',
                    nickname: curRecord.nickname || '',
                }
            }
        }
    }
}