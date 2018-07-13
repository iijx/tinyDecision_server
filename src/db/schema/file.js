

let mongoose = require('mongoose');

const Schema = mongoose.Schema;


/** 
 * fileName: 文件名
 * fileType: 文件类型
 * path: 路径
*/
const FileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    path: {
        type: 'String',
        required: true,
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


mongoose.model('File', FileSchema);

