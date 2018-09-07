var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var json = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var profile = require('../models/profile.js');
var account = require('../models/account.js');
var jwt = require('jsonwebtoken');

router.post('/view', function(req, res) {
    userId = req.body.id
    view(userId, user => {
      res.send(user)
    });
})

router.post('/edit', function(req, res) {
  // On recupere les data, puis il faudra faire le update avant de renvoyer a la Vue
  // Actuellement l'update n'est pas encore fait
  user = req.body.user
  jwt.verify(req.body.token, 'MatchaSecretKey', function(err, decoded) {
		if (err) {
		 throw(err);
	 } else {
      user.login = decoded.login
      userId = decoded.id
      view(userId, user => {
        res.send(user)
      });
		}
  });
})

module.exports = router;

function view (userId, callback) {
    account.isUser(userId, result => {
      if (result > 0) {
        fillProfile(userId, rawData => {
          convertUserData(rawData, newUser => {
            account.userEmail(userId, email => {
              newUser.email = email;
              callback(newUser)
            })
          });
        })
      } else {
          user = { userExist: false }
          callback(user)
        }
    });
}

function fillProfile(userId, callback) {
  profile.select(userId, (err, result) => {
    if (result.length > 0) {
        user = {
          userExist: true,
          id: userId,
          firstname: result[0].firstname,
          name: result[0].name,
          sexuality: result[0].sexuality,
          age: result[0].age,
          gender: result[0].gender,
          bio: result[0].bio,
          email: ''
        }
      callback(user)
    }
  });
}

function convertUserData(user, callback) {
  switch (user.gender) {
    case 0:
      user.gender = 'Homme';
      break;
    case 1:
      user.gender = "Femme";
      break;
  }
  callback(user)
}
