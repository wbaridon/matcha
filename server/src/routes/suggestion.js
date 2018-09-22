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
				sexualCheck.convertUserData(result, user => {
					localisation.getDistance(user, id, finalUser => {
								getInterests(finalUser, id, callback => {
										res.send(callback)
								})
					})
				})
			})
		})
	})
})

function getInterests(data, id, callback)
{
	interestsCheck.commonTagCount(id, data, array => {
			callback(array)
	})
}

module.exports = router;
