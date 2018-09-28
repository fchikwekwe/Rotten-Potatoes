const Comment = require('../models/comment.js')

function comments(app) {
    // NEW Comment
    app.post('/movies/:movieId/reviews/:id/comments', (req, res) =>{
        Comment.create(req.body).then(comment => {
            res.status(200).send({ comment:comment });
        }).catch((err) => {
            res.status(400).send({ err:err })
        })
    })
    // DELETE
    app.delete('/movies/:movieId/reviews/:id/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.status(200).send(comment);
      }).catch((err) => {
          console.log(err.message);
        res.status(400).send(err)
      })
    })

}

module.exports = comments;
