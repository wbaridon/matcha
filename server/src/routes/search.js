var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var search = require('../models/search.js');
var profile = require('../models/profile.js');
var jwt = require('jsonwebtoken')
var localisation = require('../utils/localisation');

router.get('/', (req, res) => {
	res.send('The server is working...'
)
})

router.post('/ask', function (req, res) {
	jwt.verify(req.body.token, 'MatchaSecretKey', function(err, decoded) {
		if (err) {
		 throw err
	 } else {
		 id = decoded.id
	 }
	 profile.select(id, (err, user) => {
		 sexualPref = user[0].sexuality
		 gender = user[0].gender
		 launchSearch(id, gender, sexualPref, req.body.ask, result => {
				localisation.getDistance(result, id, distance => {
				/*	filterDistance(distance, req.body.ask, finalTab => {
						console.log(finalTab)*/
						res.send(distance)

				})
		 })
	 })
	})
});

function launchSearch (id, gender, sexualPref, ask, callback) {
	search.result(id, gender, sexualPref, ask, data => {
		callback(data)
	})
}
/*
var newArray = [];

function filterDistance(array, conditions, callback) {
	l = 0;
	for (var i = 0; i < array.length; i++) {

		if (array[i].distance >= conditions.minDistance && array[i].distance <= conditions.maxDistance) {
			newArray[l] = array[i]
			l++;
		}
	}
	callback(newArray);
}*/
module.exports = router;
