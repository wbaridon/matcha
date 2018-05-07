
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(session({
	name: 'session',
	keys: ['M42atchaW?baridoN'],
}))

var test = require('./routes/test');
app.use('/test', test)

app.get('/', function(req, res) {
	res.render('home.ejs');
})

.post('/register', urlencodedParser, function (req, res) {
	console.log('Entre dans register');
	if (req.body.login == '' || req.body.password == '' && req.body.submit != "S'inscrire")
		console.log('Vide');
	else {
	console.log(req.body.login);
	console.log(req.body.password);
}
	res.redirect('/');
})

.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(8080);

