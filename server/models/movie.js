const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    movieId: {
        type: Number,
        required: true,
        unique: true
    },
    background_url: {
        type: String,
        default: 'N/A'
    },
    poster_url: {
        type: String,
        default: 'N/A'
    },
    description: {
        type: String
    },
    genreList: [{
        type: String
    }],
    runtime: {
        type: String
    },
    releaseDate: {
        type: String
    },
    rating: {
        type: String
    },
    certification: {
        type: String
    },
    videoLinks: [{
        type: String
    }],
    cast: [{
        type: Object
    }]
}, { timestamps: true })

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie }