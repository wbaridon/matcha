var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var model = require('../models/account.js');

router.get('/', (req, res) => {
	res.send('The server is working...'
)
})

router.post('/', function (req, res) {

});

module.exports = router;
