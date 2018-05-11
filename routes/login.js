var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var model = require('../models/account.js');

router.get('/', function(req, res) {
	res.end('Test');
})

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
            console.log('oui');
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
