const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('../models/review')

mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

const Comment =  mongoose.model('Comment', {
    title: String,
    content: String,
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = Comment
