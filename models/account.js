var db = require('../config/db');

module.exports.userExist = function (login, email, callback) {
	console.log(login);
	db.query('SELECT id FROM accounts WHERE login = ? OR email = ?', [login, email], function(err, result) {
		if (err)
		callback(err, null);
		else
		{callback(null, result.length);
			 }
	});
	return (callback)
}

module.exports.test = function () {
	console.log('Entre dans test');
	var test = 'test';
	return (test);
}

exports.userExist1 = function (login, email) {
	console.log(login);
	db.query('SELECT id FROM accounts WHERE login = ? OR email = ?', [login, email], function(err, result) {
		if (err) throw err;
		console.log('Result : ' + result.length);
	});
}
