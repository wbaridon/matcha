var db = require('../config/db');

module.exports.showList = function (callback) {
	db.query('SElECT * FROM accounts INNER JOIN profiles ON accounts.id = profiles.id_account', function (err, result, fields) {
			if (err) throw err
			callback(result);
	});
}
