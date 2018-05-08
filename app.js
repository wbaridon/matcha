
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('./config/db');

var app = express();

app.use(session({
	name: 'session',
	keys: ['M42atchaW?baridoN'],
}))


app.use('/register', require('./routes/register'))

app.get('/', function(req, res) {
	res.render('home.ejs');
})

.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(8080);

