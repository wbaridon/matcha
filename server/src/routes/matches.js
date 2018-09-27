var express = require('express');
var router = express.Router();
var matches = require('../models/matches.js');
var helpers = require('../utils/helpers.js');

module.exports = router;

router.post('/get', (req, res) => {
 	helpers.getId(req.body.userid, callback => {
    matches.getMatches(callback, (err, response) => {
      res.send(response)
    })
  })
})
