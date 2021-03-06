const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const Review =  mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number,
    movieId: { type: String, required: true }
});

module.exports = Review;
