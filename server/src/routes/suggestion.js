// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var suggestionList = require('../models/suggestionList.js');
var profile = require('../models/profile.js');
var interests = require('../models/interests.js');
var geolib = require('geolib');
var localisation = require('../utils/localisation');
var jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.send('The server is working...'
)
})

router.post('/', function(req, res) {
	token = req.body.token
	jwt.verify(token, 'MatchaSecretKey', function(err, decoded) {
		id = decoded.id
		profile.select(id, (err, user) => {
			sexualPref = user[0].sexuality
			gender = user[0].gender
			suggestionList.showList(id, gender, sexualPref, result => {
				convertUserData(result, user => {
					localisation.getDistance(user, id, finalUser => {
								getInterests(finalUser, id, callback => {
										res.send(finalUser)
								})
					})
				})
			})
		})
	})
})

function getUserPromise(id, callback) {
	return new Promise ((resolve, reject) => {
		interests.getUser(id, ret => {
			callback(ret, resolve);
		});
	});
}

var users = []

function thisIsAPromise(user) {
	return new Promise(async (resolve, reject) => {
		for (var i = 0; i < user.length; i++) {
					await getUserPromise(user[i].id, (ret, resolve) => {
						users[i] = [user[i], ret]; // Comment faire pour joindre les deux tableaux ? 
						resolve();
					})
		}
		resolve(users);
	})
}

async function getInterests(data, id, callback)
{
	await thisIsAPromise(data).then((users) => {
		callback(users)
	})
}

function convertUserData(user, callback) {
  // synchrone ou asynchrone ?
	var counter = user.length;

	user.forEach(function (item, index, array) {
		switch (item.gender) {
	    case 0:
	      item.gender = 'Homme';
	      break;
	    case 1:
	      item.gender = "Femme";
	      break;
	  }
		switch (item.sexuality) {
	    case 0:
	      item.sexuality = 'Hetero';
	      break;
	    case 1:
	      item.sexuality = 'Homo';
	      break;
	    case 2:
	      item.sexuality = 'Bisexuel';
	      break;
	  }
		counter--
		if (counter === 0) {
			callback(array)
		}
	})

}

module.exports = router;
