const mongoose = require("mongoose");

const showtimeSchema = mongoose.Schema({

    movieId: {
        type: String,
        required: true
    },
    movieTitle: {
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
    time: [{
        type: String,
    }],
    runtime: {
        type: Date,
        required: true
    },
    showType: {
        type: String,
        default: 'admin'
    },
    screenType: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = { Showtime }