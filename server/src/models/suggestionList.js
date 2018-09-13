var db = require('../config/db');

module.exports.showList = function (id, callback) {
	db.query('SElECT * FROM accounts INNER JOIN profiles \
	ON accounts.id = profiles.id_account WHERE accounts.id!=?', [id], function (err, result, fields) {
			if (err) throw err
			callback(result);
	});
}
