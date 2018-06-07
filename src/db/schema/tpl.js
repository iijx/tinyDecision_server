
let mongoose = require('mongoose');

const Schema = mongoose.Schema;


const TplSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        required: [true, 'uid required']
    },
    question: {
        required: [true, 'question required'],
        type: String,
    },
    options: {
        type: [String],
        required: [true, 'options required'],
        validate: {
            validator: function(v) {
                return v.length >= 2;
            },
            message: "options's length at least 2 item, but got {v.length} item"
        }
    },
    maxLotteryTimes: {
        type: Number,
        default: 1
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


mongoose.model('Tpl', TplSchema);

