var db = require('../config/db');

module.exports.userExist = function (login, email, callback) {
	db.query('SELECT id FROM accounts WHERE login = ? OR email = ?', [login, email], function(err, result) {
		callback(null, result.length);
	});
}

module.exports.createUser = function (user) {
	db.query('INSERT INTO accounts\
		(login, email, password, timestamp) \
		VALUES (?,?,?,?)',
	 	[user.login, user.email, user.password, user.timestamp],
		function (err, result) {
			if (err) throw err;
			else {
				console.log('User created');
			}
		});
}

module.exports.userId = function (login, callback) {
	db.query('SELECT id FROM accounts WHERE login = ?', [login], function(err, result) {
		callback(null, result);
	});
}

module.exports.userLogin = function (login, callback) {
	db.query('SELECT password FROM accounts WHERE login = ?', [login], function(err, result) {
		callback(null, result);
	});
}

module.exports.userIsActivate = function (login, callback) {
	db.query('SELECT activation FROM accounts WHERE login = ?', [login], function(err, result) {
		callback(null, result);
	});
}

module.exports.userTimestampFromEmail = function (email, callback) {
	db.query('SELECT timestamp, activation FROM accounts WHERE email = ?', [email], function(err, result) {
		callback(err, result);
	});
}

module.exports.activateAccount = function (email, callback) {
	db.query('UPDATE accounts SET activation = 1 WHERE email = ?', [email], function(err, result) {
		callback(null, result);
	});
}