// Test routeur
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var suggestionList = require('../models/suggestionList.js');

router.get('/', function(req, res) {
	suggestionList.showList(result => {
		console.log(result);
	})

	res.send('test');
})

module.exports = router;
