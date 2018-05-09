var db = require('../config/db');

module.exports.userExist = function (login, email, callback) {
	db.query('SELECT id FROM accounts WHERE login = ? OR email = ?', [login, email], function(err, result) {
		callback(null, result.length);
	});
}

module.exports.test = function () {
	console.log('Entre dans test');
	var test = 'test';
	return (test);
}
