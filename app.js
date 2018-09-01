const express = require('express')
const methodOverride = require('method-override')
const app = express()

const bodyParser = require('body-parser');

const reviews = require('./controllers/reviews.js')

reviews(app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/*
let reviews = [
    { title: "Great Review" },
    { title: "Next Review" },
    { title: "Terrible Review"}
]
*/
