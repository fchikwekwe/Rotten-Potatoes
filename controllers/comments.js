const Comment = require('../models/comment.js')

function comments(app) {
    // NEW Comment
    app.post('/reviews/comments', (req, res) =>{
        Comment.create(req.body).then(comment => {
            res.redirect(200).send({ comment:comment });
        }).catch((err) => {
            res.status(400).send({ err:err })
        })
    })
    // DELETE
    app.delete('/reviews/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })

}

module.exports = comments;
