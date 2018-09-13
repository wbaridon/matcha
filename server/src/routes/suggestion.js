// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var suggestionList = require('../models/suggestionList.js');
var profile = require('../models/profile.js');
var geolib = require('geolib');
var jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.send('The server is working...'
)
})

router.post('/', function(req, res) {
	console.log(req.body)
	token = req.body.token
	suggestionList.showList(result => {
		convertUserData(result, user => {
			getDistance(user, token, finalUser => {
				console.log(finalUser)
				res.send(finalUser)
			})

		})
	})
})

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

function getDistance(user, token, callback) {
	jwt.verify(token, 'MatchaSecretKey', function(err, decoded) {
		id = decoded.id
		profile.select(id, (err, result) => {
			lat = result[0].latitude
			long = result[0].longitude
			var counter = user.length;
			user.forEach(function (item, index, array) {
				if (item.latitude && item.longitude && lat && long) {
				 item.distance = geolib.getDistance(
					{latitude: lat, longitude: long},
					{latitude: item.latitude, longitude: item.longitude}
				);
			} else {
				item.distance = 'Non disponible'
			}
				counter--
				if (counter === 0) {
					callback(array)
				}
			})
		})
	})
}




module.exports = router;
