var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var json = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var model = require('../models/account.js');

router.post('/', json, function (req, res) {
	console.log(req.body)
	login = req.body.login
	password = req.body.password
	model.userLogin(login, function (err,data) {
		if (data.length > 0) {
			argon2.verify(data[0].password, password).then(match => {
				if (match) {
					model.userIsActivate(login, function (err, data) {
						if (data[0].activation == 1) {
							console.log('oui');
							// Faire la gestion des messages en dehors de la console
							// Ne pas oublier activation par mail pour l inscription a traiter
							// Cookies
							res.send('active')
						}
						else {
							res.send('merci activer compte');
						}
					})

				}
				else {
					res.send('non');
				}
			})
		}
		else {
			res.send('Aucun utilisateur')
		}
	});
});

module.exports = router;
