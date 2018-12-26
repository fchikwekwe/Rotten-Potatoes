const Review = require('../models/review');
const Comment = require('../models/comment');
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('23361b10253ea4a933bb622178f943e7');

module.exports = function (app) {

    // NEW
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        Review.find({ movieId: req.params.movieId }).then((movie) =>{
            res.render('reviews-new', {
                movieId: req.params.movieId
            });
        });
    });

    // CREATE
    app.post('/movies/:movieId/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            res.redirect(`/movies/${req.params.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // SHOW
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findById(req.params.id)
        .then(review => {
            //fetch its comments
            console.log(req.params.id)
            Comment.find({ reviewId: req.params.id })

            .then(comments => {
                console.log(review._id)
                // console.log(comments)
                res.render('reviews-show', { review: review, comments: comments })
                })
            }).catch((err) => {
            // catch errors
            console.log(err.message)
        });
    });

    // EDIT; show an edit template
    app.get('/reviews/:id/edit', function (req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', { review: review });
        })
    })

    // UPDATE; make a change to the database 
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/movies/${review.movieId}/reviews/${review._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
        })

    //DELETE
    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('back');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
