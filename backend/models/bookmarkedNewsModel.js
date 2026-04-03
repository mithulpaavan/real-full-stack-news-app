const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    articleId: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: [true, "title must be required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "description required bro"],
        trim: true
    },
    category: {
        type: [String],
        required: true
    },
    image_url: {
        type: String,
        trim: true
    },
    source_name: {
        type: String,
        trim: true
    },
    pubDate: {
        type: Date,
    },
    aisummary: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('News', newsSchema);