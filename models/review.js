const Comment = require('../models/comment')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

const Review =  mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
});

module.exports = Review;
