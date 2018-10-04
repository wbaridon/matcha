var express = require('express');
var router = express.Router();
var matches = require('../models/matches.js');
var helpers = require('../utils/helpers.js');

module.exports = router;

router.post('/get', (req, res) => {
 	helpers.getId(req.body.userid, callback => {
    matches.getMatchesAsEmitter(callback, (err, emitterRes) => {
        switchEmitterReceiver(emitterRes).then(array => {
          matches.getMatchesAsReceiver(callback, (err, receiverRes) => {
            var response = array.concat(receiverRes)
            res.send(response)
          })
        })
    })
  })
})

function switchEmitterReceiver(array) {
  return new Promise((resolve, reject) => {
    var tmp = ''
    for (var i = 0; i < array.length; i++) {
      tmp = array[i].emitter
      array[i].emitter = array[i].id_account
      array[i].id_account = tmp
    }
    resolve(array)
  })
}
