var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var search = require('../models/search.js');
var profile = require('../models/profile.js');
var jwt = require('jsonwebtoken')

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
			 res.send(result)
		 })
	 })
	})
});

function launchSearch (id, gender, sexualPref, ask, callback) {
	search.result(id, gender, sexualPref, ask, data => {
		callback(data)
	})
}

module.exports = router;
