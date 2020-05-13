const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    sign: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model('Category', schema)