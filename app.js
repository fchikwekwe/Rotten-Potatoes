const express = require('express');
const methodOverride = require('method-override');
const reviews = require('./controllers/reviews.js');
const comments = require('./controllers/comments.js');
const bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

const app = express();

const Comment = require('./models/comment');
const Reviews = require('./models/review');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOBD_URI || 'mongodb://localhost/rotten-potatoes');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

reviews(app);
comments(app);



app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
