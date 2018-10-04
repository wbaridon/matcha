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

module.exports.isUser = function (id, callback) {
	db.query('SELECT id FROM accounts WHERE id = ?', [id], function(err, result) {
		callback(result.length);
	});
}

module.exports.userEmail = function (id, callback) {
	db.query('SELECT email FROM accounts WHERE id = ?', [id], function(err, result) {
		callback(result[0].email);
	});
}

module.exports.selectForProfile = function (id, callback) {
	db.query('SELECT email, isOnline, lastVisit FROM accounts WHERE id = ?', [id], function(err, result) {
		callback(result[0]);
	});
}

module.exports.userLogin = function (login, callback) {
	db.query('SELECT * FROM accounts WHERE login = ?', [login], function(err, result) {
		callback(null, result);
	});
}

module.exports.userLoginFromId = function (id, callback) {
	db.query('SELECT * FROM accounts WHERE id = ?', [id], function(err, result) {
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

module.exports.updateUser = function (id, column, value, callback) {
		db.query("UPDATE accounts\
        SET " + column + "=?\
        WHERE id = ?",
        [value, id],
        callback);
}

module.exports.userTimestampPasswordFromEmail = function (email, callback) {
	db.query('SELECT timestampPassword, password, id FROM accounts WHERE email = ?', [email], function(err, result) {
		callback(err, result);
	});
}

module.exports.userTimestampPasswordFromEmailLogin = function (email, login, callback) {
	db.query('SELECT timestampPassword, password, id FROM accounts WHERE email = ? AND login = ?', [email, login], function(err, result) {
		callback(err, result);
	});
}
