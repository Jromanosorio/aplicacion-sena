const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    clientcode: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    profession: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Client', ClientSchema)

