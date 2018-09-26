var userInterest = require('../models/interests.js');
var waterfall = require('async-waterfall');
var interests = require('../models/interests.js');

function getFilter(filter, interest) {
	return new Promise ((resolve, reject) => {
		filter += ' AND interests.`'+interest+'`=1'
		resolve(filter)
	})
}
async function checkInterests(interests, callback) {
	newfilter = ''
	for (var i = 0; i < interests.length; i++) {
			newfilter = await getFilter(newfilter, interests[i])
	}
	callback(newfilter)
}

function getUserInterest(id) {
	return new Promise((resolve, error) => {
		userInterest.getUser(id, result => {
			delete result[0]['id']
			resolve(result)
		})
	})
}

function keepSelectedInterests(array) {
	return new Promise((resolve, error) => {
		i = 0;
		newArray = [];
		for (index in array) {
			if (array[index] === 1) { newArray[i++] = index; }
		}
		resolve(newArray)
	})
}

 function getCount(user, id, myInterest) {
	 return new Promise((resolve, reject) => {
		 count = 0;
		for (var i = 0; i < myInterest.length; i++) {
			if (user.interest[myInterest[i]]) {
				count++
			}
		}
		user.tagCount = count;
		resolve(user)
	})
}

function getInterestList(user) {
	return new Promise(async (resolve, reject) => {
		for (var i = 0; i < user.length; i++) {
					await getUserPromise(user[i].id, (ret, resolve) => {
						user[i].interest = ret
						resolve();
					})
		}
		resolve(user);
	})
}


function getUserPromise(id, callback) {
	return new Promise ((resolve, reject) => {
		interests.getUser(id, ret => {
			delete ret[0]['id_account']
			delete ret[0]['id']
			deleteInterest(ret[0], list => {
				callback(list, resolve);
			})
		});
	});
}

/* Delete les interets non pertinent */
function deleteInterest(list, callback) {
	return new Promise ((resolve, reject) => {
		for (index in list) {
			if (list[index] === 0)
				delete list[index]
		}
		callback(list, resolve)
	})
}
/* */
async function 	userLoop (user, myInterest, callback) {
	newUser = []
	for (var i = 0; i < user.length; i++) {
		newUser[i] = await getCount(user[i], i, myInterest)
	}
	callback(newUser)
}

function getUsersInterest(user, myInterest) {
	return new Promise((resolve, reject) => {
		userLoop(user, myInterest, finalTab => {
			resolve(finalTab)
		})
	})
}

function commonTagCount(id, user, callback) {
	waterfall([
		 function(callback) {
			getUserInterest(id)
				.then(result => {
					delete result[0]['id_account']
					userResult = result[0];
					callback(null, userResult)
				})
		},
		function (userResult, callback) {
			keepSelectedInterests(userResult)
				.then(newArray => getInterestList(user, newArray))
				.then(user => getUsersInterest(user, newArray))
				.then(finalTab => callback(null, finalTab))
		}
	], function (err, result) {
		callback(result)
	})
}

module.exports.checkInterests = checkInterests;
module.exports.commonTagCount = commonTagCount;
module.exports.keepInterests = keepSelectedInterests;
