

let mongoose = require('mongoose');

const Schema = mongoose.Schema;


/** 
 * MusicName: 文件名
 * MusicType: 文件类型
 * path: 路径
*/
const MusicSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isShow: {
        type: Boolean,
        default: true,
    },
    coverUrl: {
        type: 'String',
        required: true,
        default: ''
    },
    lyricBlock: {
        type: [String],
        default: []
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


mongoose.model('Music', MusicSchema);

