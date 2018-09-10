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

router.post('/updateBio', function(req, res) {
  bio = req.body.bio
  id = req.body.id
  console.log(bio)
  profile.updateUser(id, 'bio', bio, (err, result) => {
    if (err)
      throw err
    else
    res.send(bio)
  })
})
router.post('/updatePerso', function(req, res) {
  id = req.body.id
  profile.updateUser(id, 'name', req.body.user.name, (err, result) => {
    profile.updateUser(id, 'firstname', req.body.user.firstname, (err, result) => {
      account.updateUser(id, 'email', req.body.user.email, (err, result) => {
        profile.updateUser(id, 'age', req.body.user.age, (err, result) => {
          view(id, user => {
            res.send(user)
          })
        })
      })
    })
  })
})

router.post('/updatePwd', function(req, res) {
    res.send('non operationnel')
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
  // synchrone ou asynchrone ?
  switch (user.gender) {
    case 0:
      user.gender = 'Homme';
      break;
    case 1:
      user.gender = "Femme";
      break;
  }
  switch (user.sexuality) {
    case 0:
      user.sexuality = 'Hetero';
      break;
    case 1:
      user.sexuality = 'Homo';
      break;
    case 3:
      user.sexuality = 'Bisexuel';
      break;
  }
  callback(user)
}
