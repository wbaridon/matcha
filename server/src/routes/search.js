var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var search = require('../models/search.js');
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
	 launchSearch(id, req.body.ask, result => {
		 res.send(result)
	 })
	})
});

function launchSearch (id, ask, callback) {
	search.result(id, ask, data => {
		callback(data)
	})
}

module.exports = router;
