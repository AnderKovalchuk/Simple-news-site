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
    shortText: {
        type: String,
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

module.exports = model('News', schema)