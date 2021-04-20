const mongoose = require("mongoose");

const showtimeSchema = mongoose.Schema({

    movieId: {
        type: String,
        required: true
    },
    cinemaId: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    runtime: {
        type: Date,
        required: true
    },
    screenType: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = { Showtime }