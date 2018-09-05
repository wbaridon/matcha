// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var suggestionList = require('../models/suggestionList.js');

router.post('/', function(req, res) {
	suggestionList.showList(result => {
		res.send(result)
	})
})

module.exports = router;
