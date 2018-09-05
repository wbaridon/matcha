var db = require('../config/db');

module.exports.showList = function (callback) {
	db.query('SElECT * FROM accounts', function (err, result, fields) {
			if (err) throw err
			callback(result);
	});
}
