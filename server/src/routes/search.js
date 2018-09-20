var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var search = require('../models/search.js');
var profile = require('../models/profile.js');
var jwt = require('jsonwebtoken')
var localisation = require('../utils/localisation');
var interestsCheck = require('../utils/interestsCheck');

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
				localisation.getDistance(result, id, distance => {
					interestsCheck.commonTagCount(id, distance, array => {
							res.send(array)
					})
				})
		 })
	 })
	})
});

function launchSearch (id, gender, sexualPref, ask, interests, callback) {
	search.result(id, gender, sexualPref, ask, interests, data => {
		callback(data)
	})
}

module.exports = router;
