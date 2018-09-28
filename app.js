const express = require('express');
const methodOverride = require('method-override');

const bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

const app = express();

const Comment = require('./models/comment');
const Reviews = require('./models/review');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOBD_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.json());

require('./controllers/reviews.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/movies.js')(app);
require('./controllers/admin.js')(app);

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;
