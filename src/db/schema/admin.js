
let mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    username: {
        unique: true,
        required: true,
        type: String,
    },
    hashPassword: {
        required: true,
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

mongoose.model('Admin', AdminSchema);
