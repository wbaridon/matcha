// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var model = require('../models/account.js');
var mail = require('nodemailer');

router.get('/', function(req, res) {

	res.render('error.ejs', {error: 'Aucun message'});
})

router.get('/emailSent', function(req, res) {
	res.render('confirmation.ejs', {message: 'Un email pour activer votre compte vient de vous etre envoye'});
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
					var tunnel = mail.createTransport ({
						service: 'gmail',
						auth: {
								user: 'matchawb@gmail.com',
								pass: '42camagru'
						}
					});

					var mailOptions = {
						from: 'matchawb@gmail.com',
						to: user.email,
						subject: 'Confirmation compte matcha',
						text: 'Test envoi email'
					};
					tunnel.sendMail(mailOptions, function(err, info){
						if (err) {
							console.log(err);
						} else {
							console.log('Email sent:' + info.response);
						}
					});
					res.redirect('/register/emailSent');
				})
			}
			else {
				res.render('error.ejs', {error: 'Utilisateur ou mail déjà existant'});
			}
		})

	}
		else

			res.render('error.ejs', {error: 'Merci de remplir tous les champs'});
})

module.exports = router;
