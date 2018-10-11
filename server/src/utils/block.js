var blacklist = require('../models/blacklist.js');

async function filter (id, array, callback) {
	var finalArray = []
	var j = 0;

	for (var i = 0; i < array.length; i++) {
		status = await BlockStatus(id, array[i])
		if (status === false) {
			finalArray[j++] = array[i]
		}
	}
	callback(finalArray)
}

function BlockStatus (id, user) {
	return new Promise((resolve, reject) => {
		blacklist.getBlockStatus(id, user.id_account, result => {
			if (result.length > 0) { resolve(true) }
			else { resolve(false) }
		})
	})
}

function BlockStatusForNotif (id, userid) {
	return new Promise((resolve, reject) => {
		blacklist.getBlockStatus(id, userid, result => {
			if (result.length > 0) { resolve(true) }
			else { resolve(false) }
		})
	})
}

module.exports.filter = filter;
module.exports.BlockStatus = BlockStatusForNotif;
