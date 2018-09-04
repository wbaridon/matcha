var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var setup = require('../config/setup.js');

router.get('/', function (req, res) {
    require('../config/setup');
});

module.exports = router;
