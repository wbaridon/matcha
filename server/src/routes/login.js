var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var json = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var model = require('../models/account.js');

router.get('/', function(req, res) {
	res.end('Test');
})

router.post('/test', json, function (req, res) {

	login = req.body.login
	password = req.body.password

	model.userLogin(login, function (err,data) {
		if (data.length > 0) {
			argon2.verify(data[0].password, password).then(match => {
				if (match) {
					model.userIsActivate(login, function (err, data) {
						if (data[0].activation == 1) {
							console.log('oui');
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

router.post('/', urlencodedParser, function (req, res) {
  if (Object.keys(req.body).length == 3 && req.body.submit == 'Se connecter') {
		var user = {
			login: req.body.login,
			password: req.body.password,
		}
    model.userLogin(user.login, function (err, data) {

      console.log(data);
      if (data.length > 0) {
        data = data[0].password;
        argon2.verify(data, user.password).then(match => {
          if (match) {
            model.userIsActivate(user.login, function (err, data) {
              if (data[0].activation == 1)
              console.log('oui');
              else {
                console.log('merci activer compte');
              }
            })

          }
          else {
            console.log('non');
          }
        })
      }
      else {
        res.render('error.ejs', {error: 'Utilisateur ou mot de passe faux'});
      }
    });
  }
  else {
    res.render('error.ejs', {error: 'Merci de remplir tous les champs'});
  }
});

module.exports = router;
