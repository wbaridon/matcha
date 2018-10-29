// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var account = require('../models/account.js');
var profile = require('../models/profile.js');
var interests = require('../models/interests.js');
var mail = require('nodemailer');
var myhash = require('../utils/hash');

router.get('/', (req, res) => {
	res.send('The server is working...'
)
})


function sendMail(user) {
	var tunnel = mail.createTransport ({
		service: 'gmail',
		auth: {
				user: 'matchawb@gmail.com',
				pass: '42camagru'
		}
	});
	myhash.hash(user.email + user.timestamp, hash => {
		var mailOptions = {
			from: 'matchawb@gmail.com',
			to: user.email,
			subject: 'Confirmation compte matcha',
			text: 'Bonjour ' + user.firstname + ', et bienvenue sur matcha! Cliquez sur ce lien pour activer votre compte : ' + global.host + '/activate?email=' + user.email + '&key=' + hash
		};
		tunnel.sendMail(mailOptions, function(err, info){
			if (err) {
			} else {
			}
		});
	});
}


router.post('/', urlencodedParser, function (req, res) {
	global.host = req.headers.origin
	if (Object.keys(req.body).length == 5) {
		var user = {
			login: req.body.login,
			password: req.body.password,
			email: req.body.email,
			name: req.body.name,
			firstname: req.body.firstname,
			timestamp: Date.now()
		}
	} else {
		res.send('Merci de remplir tous les champs');
	}
	account.userExist(user.login, user.email, function(err, data) {
		if (data == 0) {
			argon2.hash(user.password).then(hash => {
				user.password = hash;
				account.createUser(user);
				account.userId(user.login, function(login, res) {
					profile.createUser(user, res[0].id);
					interests.createUser(res[0].id);
				});
				sendMail(user);
				res.send('Ok');
			})
		}
		else {
			res.send('Cet utilisateur ou email existe deja');
		}
	})
})

module.exports = router;
