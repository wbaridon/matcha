// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var model = require('../models/account.js');

router.get('/', function(req, res) {

	res.render('error.ejs', {error: 'Aucun message'});
})

router.get('/about', function(req, res) {
	var model = require('../models/test.js');
	console.log(model.test());
	res.send('About');
})

router.post('/', urlencodedParser, function (req, res) {
	if (Object.keys(req.body).length == 6 && req.body.submit == 'S\'inscrire') {
		var user = {
			login: req.body.login,
			password: req.body.password,
			email: req.body.email,
			name: req.body.name,
			firstname: req.body.firstname
		}
		model.userExist(user.login, user.email, function(err, data) {
			if (data == 0) {
				argon2.hash(user.password).then(hash => {
					user.password = hash;
					model.createUser(user);
				})
			}
			else {
				res.render('error.ejs', {error: 'Utilisateur ou mail déjà existant'});
			}
		})

	}
		else
			res.render('error.ejs', {error: 'Merci de remplir tous les champs'});



	//res.redirect('/');
})

module.exports = router;
