const mongoose = require("mongoose");

const cinemaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = { Cinema }