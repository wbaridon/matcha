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
var interestsCheck = require('../utils/interestsCheck');
var sexualCheck = require('../utils/sexualCheck');
var helpers = require('../utils/helpers.js');
var block = require('../utils/block.js');
var waterfall = require('async-waterfall');

router.get('/', (req, res) => {
		res.send('The server is working...')
})

router.post('/getUser', (req, res) => {
	helpers.getId(req.body.token, callback => {
		profile.select(callback, (err, user) => {
			res.send(user[0]);
		})
	})
})

router.post('/', function(req, res) {
	token = req.body.token
	jwt.verify(token, 'MatchaSecretKey', function(err, decoded) {
		id = decoded.id
		profile.select(id, (err, user) => {
			helpers.profileIsFill(user, callback => {
				if (callback === 1) {
					sexualPref = user[0].sexuality
					gender = user[0].gender
					userPop = user[0].popularite
					suggestionList.showList(id, gender, sexualPref, req.body.ask, req.body.ask.checkedInterests, result => {
						sexualCheck.convertUserData(result, user => {
							localisation.getDistance(user, id, finalUser => {
								distanceFilter(finalUser, req.body.ask.minDistance, req.body.ask.maxDistance, distanceFilter => {
										getInterests(distanceFilter, id, callback => {
											block.filter(id, callback, filterView => {
												addCompatibility(filterView, userPop, newArray => {
														res.send(newArray)
												})
											})

										})
								})
							})
						})
					})
				}
				else {
					res.send({error: 1})
				}
			});
		})
	})
})

function getInterests(data, id, callback)
{
	interestsCheck.commonTagCount(id, data, array => {
			callback(array)
	})
}

function tagCompatibility(tagCount, callback) {
	if (tagCount >= 6) { callback(15) }
	else if (tagCount === 5) { callback(12) }
	else if (tagCount === 4) { callback(10) }
	else if (tagCount === 3) { callback(8) }
	else if (tagCount === 2) { callback(4) }
	else if (tagCount === 1) { callback(2) }
	else { callback (0) }
}

function distanceCompatibility(distance, callback) {
		if (distance < 1000) { callback(35) }
		else if(distance < 2000) { callback(32) }
		else if (distance < 3000) {callback(30) }
		else if (distance < 4000) { callback(28) }
		else if (distance < 5000) { callback(25) }
		else if (distance < 6000) { callback(22) }
		else if (distance < 4000) { callback(20) }
		else if (distance < 5000) { callback(15) }
		else if (distance < 6000) { callback(10) }
		else if (distance < 7000) { callback(5) }
		else { callback (0)}
}

function populariteCompatibility(user1Pop, user2Pop, callback) {
	popularite = user1Pop - user2Pop
	if (popularite <= -100 && popularite >= +100) { callback(10) }
	else if (popularite <= -150 && popularite >= +150) { callback(8) }
	else if (popularite <= -200 && popularite >= +200) { callback(7) }
	else if (popularite <= -300 && popularite >= +300) { callback(6) }
	else if (popularite <= -400 && popularite >= +400) { callback(4) }
	else if (popularite <= -500 && popularite >= +500) { callback(2) }
	else { callback (0) }
}

function compatibilityUser (user, userPop) {
	return new Promise ((resolve, reject) => {
		count = 40
		// On doit aussi faire un rapport avec la popularite
		distanceCompatibility(user.distance, distance => {
			count = count + distance
			tagCompatibility(user.tagCount, tagCount => {
				count = count + tagCount
				populariteCompatibility(user.popularite, userPop, popularite => {
					count = count + popularite
					resolve(count)
				})
			})
		})
	})
}

async function addCompatibility(array, userPop, callback) {
	for (var i = 0; i < array.length; i++) {
		array[i].compatibility = await compatibilityUser(array[i], userPop)
	}
	callback (array)
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
