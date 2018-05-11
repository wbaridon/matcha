var db = require('../config/db');

module.exports.userExist = function (login, email, callback) {
	db.query('SELECT id FROM accounts WHERE login = ? OR email = ?', [login, email], function(err, result) {
		callback(null, result.length);
	});
}

module.exports.createUser = function (user) {
	db.query('INSERT INTO accounts\
		(login, email, password, name, firstname) \
		VALUES (?,?,?,?,?)',
	 	[user.login, user.email, user.password, user.name, user.firstname],
		function (err, result) {
			if (err) throw err;
			else {
				console.log('User created');
			}
		});
}
