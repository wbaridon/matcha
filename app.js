
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var db = require('db');

app.use(session({
	name: 'session',
	keys: ['M42atchaW?baridoN'],
}))

var register = require('./routes/register');
app.use('/register', register)

app.get('/', function(req, res) {
	res.render('home.ejs');
})

.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(8080);

