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
					suggestionList.showList(id, gender, sexualPref, result => {
						sexualCheck.convertUserData(result, user => {
							localisation.getDistance(user, id, finalUser => {
										getInterests(finalUser, id, callback => {
											block.filter(id, callback, filterView => {
													res.send(filterView)
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

module.exports = router;
