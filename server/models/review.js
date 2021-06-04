const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    rating: {
        type: String,
        required: true
    },
    isSpoiler: {
        type: Boolean,
        default: false
    },
    heading: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review }