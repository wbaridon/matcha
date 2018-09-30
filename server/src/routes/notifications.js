var express = require('express');
var router = express.Router();
var notifications = require('../models/notifications');
var profile = require('../models/profile');
var helpers = require('../utils/helpers');

router.get('/', (req, res) => {
	res.send('The server is working...'
)
})

router.post('/get', function (req, res) {
	var id = req.body.id;
	switch (req.body.action) {
		case 'likes':
				notifications.getAllFrom(id, 0, (err, result) => {
					if (result.length > 0) {
						getUsersResume(result, callback => {
							res.send({'action': 'likes', callback})
						})
					} else {
						res.send({'action': 'likes', result})
					}
				})
			break;
		case 'visits':
				notifications.getAllFrom(id, 1, (err, result) => {
					if (result.length > 0) {
						getUsersResume(result, callback => {
							res.send({'action': 'visits', callback})
						})
					} else {
						res.send({'action': 'visits', result})
					}
				})
			break;
	}
});

router.post('/getAll', function (req, res) {
	console.log(req.body)
	helpers.getId(req.body.token, id => {
		notifications.getAll(id, (err, array) => {
			res.send(array)
		})
	})
})

router.post('/profileVisit', function (req, res) {
	console.log('arrive dans profile visit')
})

module.exports = router;

async function getUsersResume(array, callback)
{
	var newArray = []
	for (var i = 0; i < array.length; i++) {
		newArray[i] = await getResumeFrom(array[i].emitter)
	}
	callback(newArray)
}

function getResumeFrom(id) {
	return new Promise((resolve, reject) => {
		profile.select(id, (err, result) => {
			resolve(result[0])
		})
	})
}
