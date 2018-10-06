var express = require('express');
var router = express.Router();
var matches = require('../models/matches.js');
var helpers = require('../utils/helpers.js');

module.exports = router;

// To access specific chat page, user MUST HAVE matched (TRUE or FALSE)
router.post('/checkmatch', function (req, res) {
  helpers.getId(req.body.token, (callback) => {
    var recipient = parseInt(req.body.recipient)
    matches.checkMatched(callback, recipient, (err, result) => {
      // If SQL returns EMPTY ARRAY, return FALSE
      if (!Array.isArray(result) || !result.length) {
        res.send(false)
      }
      else {
        res.send(true)
      }
    })
  })
});
