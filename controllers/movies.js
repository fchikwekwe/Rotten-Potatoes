const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('23361b10253ea4a933bb622178f943e7');
const Review = require('../models/review.js');

module.exports = (app) => {
      // ROOT
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies()
        .then(response => {
            res.render('movies-index', { movies: response.results });
        })
        .catch(console.error)
    });

    // // SHOW
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id })
        .then(movie => {
            // if conditional <=================================
             moviedb.movieVideos({ id: req.params.id })
             .then(videos => {
                 movie.trailer_youtube_id = videos.results[0].key
                 renderTemplate(movie);
             })
             .catch(console.error)
             function renderTemplate(movie) {
                 Review.find({ movieId: req.params.id })
                 .then(reviews => {
                     res.render('movies-show', { movie: movie, reviews: reviews });
                     })
                }
          })
          .catch(console.error)
    })
}
