var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var model = require('../models/account.js');
var jwt = require('jsonwebtoken');
var token;

router.post('/checkAuth', function (req, res) {

	jwt.verify(req.body.key, 'MatchaSecretKey', function(err, decoded) {
		if (err) {
		 res.send({'result': false})
	 }
		else {
			res.send({'result': true})
		}
	})


});
router.post('/', function (req, res) {
	appData = {} /* Test jwt */
	login = req.body.login
	password = req.body.password

	model.userLogin(login, function (err,data) {
		if (data.length > 0) {
			argon2.verify(data[0].password, password).then(match => {
				if (match) {
					model.userIsActivate(login, function (err, data) {
						if (data[0].activation == 1) {
							/* Recuperer plutot toutes les informations account pour faire un data[0] pour le jsonwebtoken */
							token = jwt.sign({data: login}, 'MatchaSecretKey', { expiresIn: '1h'});
							appData.error = 0;
							appData["token"] = token;
							console.log(appData);
								console.log('oui');

							res.status(200).json(appData);

							// Faire la gestion des messages en dehors de la console
							// Ne pas oublier activation par mail pour l inscription a traiter
							// Cookies
							//res.send('active')
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
