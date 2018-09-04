var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var model = require('../models/account.js');

router.get('/', function (req, res) {
    let email = req.query.email; 
    let key = req.query.key;
    console.log(email);
    console.log(key);
    model.userIdFromEmail(email, res => {
        console.log(res[0].id);
    });
});

module.exports = router;