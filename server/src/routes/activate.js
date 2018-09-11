var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var model = require('../models/account.js');

router.post('/', function (req, res) {
    let email = req.body.email;
    let key = req.body.key.replace(' ', '+');

    model.userTimestampFromEmail(email, (err, callback) => { //Mail existing in DB with associated timestamp
        if (err) throw err; 
        else if (callback[0].activation === 0) {
            argon2.verify(key, email + callback[0].timestamp).then(match => {
                if (match) { //Hash correspondant
                    model.activateAccount(email, (err, result) => {
                        if (err) throw err;
                        else
                          res.send('Account with email ' + email + ' has been activated.');
                    });
                }
                else
                    res.send('Key not corresponding to the hash.');
            });
        }
        else { //Account activated in DB
          res.send('This account: ' + email + ' has already been activated.');
        }
    });
});

module.exports = router;
