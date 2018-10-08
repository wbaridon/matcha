var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var search = require('../models/search.js');
var profile = require('../models/profile.js');
var jwt = require('jsonwebtoken')
var localisation = require('../utils/localisation');
var interestsCheck = require('../utils/interestsCheck');
var sexualCheck = require('../utils/sexualCheck');
var block = require('../utils/block')
var waterfall = require('async-waterfall');

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
		 launchSearch(id, gender, sexualPref, req.body.ask, req.body.interests, result => {
			 if (result.length > 0) {
				localisation.getDistance(result, id, distance => {
					distanceFilter(distance, req.body.ask.minDistance, req.body.ask.maxDistance, distanceFilter => {
						interestsCheck.commonTagCount(id, distanceFilter, array => {
								sexualCheck.convertUserData(array, convert => {
									block.filter(id, convert, blockLess => {
											res.send(blockLess)
									})
							})
						})
					})
				})
			 } else {
				res.send([])
			}
		 })
	 })
	})
});

function launchSearch (id, gender, sexualPref, ask, interests, callback) {
	search.result(id, gender, sexualPref, ask, interests, data => {
		callback(data)
	})
}

function distanceFilter(array, min, max, callback) {
	waterfall([
		function(callback) {
			distancemin = array.filter(element => element.distance >= min)
			callback(null, distancemin)
		},
		function(distancemin, callback) {
			distance = distancemin.filter(element => element.distance <= max)
			callback(null, distance)
		}
	], function (err, result) {
		callback(result)
	})
}

module.exports = router;
