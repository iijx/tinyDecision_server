



let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RECORDS_CATS = {
    MUSIC: 'music',
    POEM: 'poem',
    GOODNIGHT: 'goodnight'
}
/** 
 * fileId: 文件id
 * author: 作者信息
 * cat: 文件分类
*/
const RecordSchema = new Schema({
    fileId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    authorOpenid: {
        type: Schema.Types.ObjectId,
    },
    cat: {
        type: String,
    },
    musicId: {
        type: Schema.Types.ObjectId,
    },
    lyricIndex: {
        type: Number,
    },
    poemId: {
        type: Schema.Types.ObjectId,
    },
    isShow: {
        type: Boolean,
        default: true,
    },
    likeNum: {
        type: Number,
        default: 0,
    },
    playNum: {
        type: Number,
        default: 0
    },
    meta: {
        created: {
            type: Date,
            default: Date.now(),
        },
        updated: {
            type: Date,
            default: Date.now(),
        }
    }
})


mongoose.model('Record', RecordSchema);

