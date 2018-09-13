var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var model = require('../models/account.js');
var jwt = require('jsonwebtoken');
var token;

router.get('/', (req, res) => {
	res.send('The server is working...'
)
})

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
			user = {
				id: data[0].id,
				login: login
			}
			argon2.verify(data[0].password, password).then(match => {
				if (match) {
					model.userIsActivate(login, function (err, data) {
						if (data[0].activation == 1) {

							token = jwt.sign(user, 'MatchaSecretKey', { expiresIn: '1d'});
							appData.error = 0;
							appData["token"] = token;
							res.status(200).json(appData);

							// Faire la gestion des messages en dehors de la console
							// Ne pas oublier activation par mail pour l inscription a traiter
							// Cookies
							//res.send('active')
						}
						else {
							res.send("Merci d'activer votre compte");
						}
					})

				}
				else {
					res.send('Mot de passe ou utilisateur incorrect');
				}
			})
		}
		else {
			res.send('Mot de passe ou utilisateur incorrect')
		}
	});
});

module.exports = router;
