const mongoose = require("mongoose");

const reviewReport = mongoose.Schema({
    reviewId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        default: false
    },
    reasons: [{
        type: String,
        required: true
    }],
    reasonDescription: {
        type: String
    },
    status: {
        type: String,
        default: 'proccessing'
    }
}, { timestamps: true })

const ReviewReport = mongoose.model('review_report', reviewReport);

module.exports = { ReviewReport }