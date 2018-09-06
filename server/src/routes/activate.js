var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var model = require('../models/account.js');

router.get('/', function (req, res) {
    let email = req.query.email; 
    let key = req.query.key.replace(' ', '+');
    model.userTimestampFromEmail(email, (err, res) => { //Mail existing in DB with associated timestamp
        if (err) throw err;
        else if (res[0].activation === 0) {
            argon2.verify(key, email + res[0].timestamp).then(match => {
                if (match) { //Hash correspondant
                    model.activateAccount(email, (err, res) => {
                        if (err) throw err;
                        else
                            console.log('Account with email ' + email + ' has been activated.');
                    });
                }
                else
                    console.log('Key not corresponding to the hash.');
            });
        }
        else { //Account activated in DB
            console.log('This account: ' + email + ' has already been activated.');
        }
    });
});

module.exports = router;