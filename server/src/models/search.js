var db = require('../config/db');

module.exports.result = function (id, ask, callback) {
	filter = ''
	if (ask.minAge) {
		filter='AND age>='+ask.minAge
		if (ask.maxAge) {
			filter=filter+' AND age<='+ask.maxAge
		}
	}
	db.query('SElECT * FROM accounts INNER JOIN profiles \
	ON accounts.id = profiles.id_account WHERE accounts.id!=? \
	'+filter, [id], function (err, result, fields) {
			if (err) throw err
			callback(result);
	});
}
