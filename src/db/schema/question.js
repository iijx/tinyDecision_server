
let mongoose = require('mongoose');

const Schema = mongoose.Schema;


const QuestionSchema = new Schema({
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
    resolvedAt: {
        type: Date,
        default: new Date('1970-1-1'),
    },
    maxLotteryTimes: {
        type: Number,
        default: 1
    },
    lotteriedTimes: {
        type: Number,
        default: 0
    },
    resolvedValue: {
        type: String,
        default: '',
    },
    resolvedAngle: {
        type: Number,
        default: 0,
    },
    isResolved: {
        type: Boolean,
        default: false,
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


mongoose.model('Question', QuestionSchema);

