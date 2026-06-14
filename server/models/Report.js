const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    type: {
        type: String,
        enum: ['media', 'text'],
        required: true
    },
    input: {
        type: String, // URL or Text content or Filename
        required: true
    },
    deepwareScore: {
        type: Number,
        default: 0
    },
    factCheckScore: {
        type: Number,
        default: 0
    },
    metadataScore: {
        type: Number,
        default: 0
    },
    trustScore: {
        type: Number,
        required: true
    },
    deepfakeProbability: {
        type: Number,
        default: 0
    },
    details: {
        type: mongoose.Schema.Types.Mixed // Flexible storage for API responses
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);
