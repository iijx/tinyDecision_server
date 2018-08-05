
let mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    openid: {
        unique: true,
        required: true,
        type: String,
    },
    nickname: {
        type: String,
    },
    avatarUrl: {
        type: String,
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

mongoose.model('User', UserSchema);
