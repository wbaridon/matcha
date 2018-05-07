// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');

router.get('/', function(req, res) {

	res.render('error.ejs', {error: 'Aucun message'});
})

router.get('/about', function(req, res) {
	res.send('About');
})

router.post('/', urlencodedParser, function (req, res) {
	console.log('Entre dans register');
	if (req.body.login == '' || req.body.password == '' && req.body.submit != "S'inscrire")
		res.render('error.ejs', {error: 'Merci de remplir tous les champs'});
	else {
		argon2.hash(req.body.password).then(hash => {
			console.log(hash);
})
	console.log(req.body.login);
	console.log(req.body.password);
}
	res.redirect('/');
})

module.exports = router;
