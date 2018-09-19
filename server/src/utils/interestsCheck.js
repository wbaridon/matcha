var userInterest = require('../models/interests.js');
var waterfall = require('async-waterfall');

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

/* TAG COMPARE */
/*
function anUser (userResult) {
	return Promise((resolve, reject) => {
		userInterest.getUser(user.id, callback => {
			resolve(callback)
		})
	})
}
async function tagCompare(userResult, user) {
	return new Promise((resolve, reject) => {
		count = 1
	 	delete userResult[0]['id']
		delete userResult[0]['id_account']
		for (var i = 0; i < user.length; i++) {
			//console.log(i+'='+userResult[0][i])
			users = await anUser(user[i])
			console.log(users)
		}
//		console.log(user)
		resolve(count)
	})
}

function getUserInterest(id) {
	return new Promise((resolve, reject) => {
		userInterest.getUser(id, userResult => {
			resolve(userResult)
		})
	})
}
async function commonTagCount(id, user, callback) {
	console.log('mon id:' +id)
	userResult = await	getUserInterest(id)
		for (var i = 0; i < user.length; i++) {
			 test = await tagCompare(userResult, user[i])
		}
	//	console.log('Retour du await:' + test)
		callback(user)

}*/

function getUserInterest(id) {
	return new Promise((resolve, error) => {
		userInterest.getUser(id, result => {
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

function getUsersInterest(user, myInterest) {
	return new Promise((resolve, error) => {
		newArray = [];
	console.log('L:'+myInterest.length +' de '+ myInterest[0])
//	console.log(user[1].myInterest[0])
	/*result = Object.keys(user).map(function(key) {
		return [key, user[key]];
	})
	console.log(result[0])
	console.log(result[0][id])*/
	
/*	myInterest.forEach(elem => {

	})
	console.log(user[0].)*/
		resolve(newArray)
	})
}

function commonTagCount(id, user, callback) {
	waterfall([
		 function(callback) {
			getUserInterest(id)
				.then(result => {
					delete result[0]['id']
					delete result[0]['id_account']
					userResult = result[0];
					callback(null, userResult)
				})
		},
		async function (userResult, callback) {
			myInterest = await keepSelectedInterests(userResult)
			usersInterest = await getUsersInterest(user, myInterest)
			console.log('Apres promesse ' + usersInterest)

			callback(null, '1')
		},
		function(userResult, callback) {
			console.log(userResult)
				//await getUserInterest()
			for (var i = 0; i < userResult.length; i++) {
			//	if (Object.keys(userResult).find(key => userResult[key] === 1))
			  console.log('enter')
			}
		/*	console.log(userResult)
			console.log(sortArray)
			getUsersInterest(user, test => {
				console.log(test)*/
					callback(null,userResult);
		//	})
		}
	], function (err, result) {
		console.log('Result:'+result)
	})
}


module.exports.checkInterests = checkInterests;
module.exports.commonTagCount = commonTagCount;
