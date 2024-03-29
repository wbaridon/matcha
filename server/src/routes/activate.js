var express = require('express');
var router = express.Router();
var model = require('../models/account.js');
var myhash = require('../utils/hash');

router.get('/', (req, res) => {
	res.send('The server is working...'
)
})

router.post('/', function (req, res) {
    if (req.body.email && req.body.key) {
        let email = req.body.email;
        let key = req.body.key;

        model.userTimestampFromEmail(email, (err, resp) => { //Mail existing in DB with associated timestamp
            if (err) throw err; 
            else if (!resp[0])
                res.send(`This mail ${email} doesn't exists.`);
            else if (resp[0].activation === 0) {
                myhash.verify(email + resp[0].timestamp, key, match => {
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
    }
});

module.exports = router;
