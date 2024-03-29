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

router.post('/getLikeStatus', function (req, res) {
	helpers.getId(req.body.token, id => {
		notifications.getActionsFromEmitterForReceiver(id, req.body.receiver, req.body.action, (err, result) => {
			notifications.getActionsFromEmitterForReceiver(id, req.body.receiver, 3, (err, otherResult) => {
				final = result.concat(otherResult)
				if (final.length > 0) { res.send ({'like':true})}
				else {res.send({'like':false})}
				})
		})
	})
})

router.post('/getAll', function (req, res) {
	helpers.getId(req.body.token, id => {
		notifications.getAll(id, (err, array) => {
			translateNotification(array)
			.then(result => {
				helpers.getUsersProfileFromEmitter(result, callback => {
					res.send(callback)
				})
			})
		})
	})
})

router.post('/profileVisit', function (req, res) {

})

router.post('/read', function (req, res) {
	helpers.getId(req.body.token, id => {
		notifications.updateAction(id, callback => {
			res.send({success: 'notifications were read'})
		})
	})
})

router.post('/count', function (req, res) {
	helpers.getId(req.body.token, id => {
		notifications.count(id, (err, callback) => {
			res.send(callback[0])
		})
	})
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

function translateNotification(array) {
	return new Promise ((resolve,reject) => {
		for (var i = 0; i < array.length; i++) {
			switch (array[i].action) {
				case 0: array[i].action = 'vient de vous liker'
					break;
				case 1: array[i].action = 'vient de visiter votre profil'
					break;
				case 2: array[i].action = 'vient de vous envoyer un message'
					break;
				case 3: array[i].action = 'vient de vous liker en retour'
					break;
				case 4: array[i].action = 'vient d\'annuler le match'
					break;
				default:

			}

		}
		resolve(array)
	})
}
