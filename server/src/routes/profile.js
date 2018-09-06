var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var json = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');
var profile = require('../models/profile.js');

router.post('/view', function(req, res) {
  
    userId = req.body.id
    profile.select(userId, (err, result) => {
      if (result.length > 0) {
          user = {
            userExist: true,
            id: userId,
            firstname: result[0].firstname,
            name: result[0].name,
            sexuality: result[0].sexuality,
            age: result[0].age,
            gender: result[0].gender,
            bio: result[0].bio,
            email: ''
          }
      } else {
          user = {
            userExist: false
          }
        }
        res.send(user)
    })
})

module.exports = router;
