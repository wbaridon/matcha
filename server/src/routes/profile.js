var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var json = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var argon2 = require('argon2');

router.post('/view', function(req, res) {
    console.log(req.body.id)
    res.send('ok')
})

module.exports = router;
