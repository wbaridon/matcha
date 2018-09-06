var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var json = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var profile = require('../models/profile.js');

router.post('/view', function(req, res) {
    // Faire une verif si user exist avec promise
    // Si oui
    userId = req.body.id
    profile.select(userId, (err, result) => {
          user = {
            id: userId,
            firstname: result[0].firstname,
            name: result[0].name,
            email: ''
          }
          console.log(user)
            res.send(user)
    })
})

module.exports = router;
