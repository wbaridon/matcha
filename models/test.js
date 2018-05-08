var db = require('../config/db');

exports.userExist = function (login, email) {
	console.log(login);
	db.query('SELECT id FROM accounts WHERE login = ? OR email = ?', [login, email], function(err, result) {
		if (err) throw err;
		console.log('Result : ' + result.length);
	});
}
exports.userExist1 = function (login, email) {
	console.log(login);
	db.query('SELECT id FROM accounts WHERE login = ? OR email = ?', [login, email], function(err, result) {
		if (err) throw err;
		console.log('Result : ' + result.length);
	});
}