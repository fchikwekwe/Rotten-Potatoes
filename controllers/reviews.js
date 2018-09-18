const Review = require('../models/review')
const Comment = require('../models/comment')
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('23361b10253ea4a933bb622178f943e7')

function reviews(app) {
    // INDEX

    // app.get('/', (req, res) => {
    //     Review.find()
    //         .then(reviews => {
    //             res.render('reviews-index', {reviews: reviews});
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // });

    // NEW
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        res.render('reviews-new', { movieId: req.params.movieId});
    })

    // CREATE
    app.post('/movies/:movieId/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            res.redirect(`/movies/${req.params.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // SHOW
    app.get('/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then(review => {
            Comment.find({ reviewId: req.params.id }).then(comments => {
                res.render('reviews-show', { review: review, comments: comments })
            })
        }).catch((err) => {
            console.log(err.message)
        });
    });

    // EDIT
    app.get('/reviews/:id/edit', function (req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('review-edit', {review: review});
        })
    })

    // UPDATE
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/reviews/${review._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
        })

    //DELETE
    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}

module.exports = reviews;
