const express = require('express')
const methodOverride = require('method-override')
const app = express()

const bodyParser = require('body-parser');

const reviews = require('./controllers/reviews.js')
const comments = require('./controllers/comments.js')

const Comment = require('./models/comment')
const Reviews = require('./models/review')

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOBD_URI || 'mongodb://localhost/rotten-potatoes');

reviews(app)
comments(app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
