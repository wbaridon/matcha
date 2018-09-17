var db = require('../config/db');
var sexualCheck = require('../utils/sexualCheck');

module.exports.result = function (id, gender, sexualPref, ask, callback) {
	filter = ''
	if (ask.minAge) { filter+=' AND age>='+ask.minAge }
	if (ask.maxAge) { filter+=' AND age<='+ask.maxAge }
	if (ask.minPop) { filter+=' AND popularite>='+ask.minPop }
	if (ask.maxPop) { filter+=' AND popularite<='+ask.maxPop }
	sexualCheck.analysis(sexualPref, gender, preference => {
		sexualCheck.sqlSentence(preference, ret => {
			filter += ret
			db.query('SElECT * FROM accounts INNER JOIN profiles \
			ON accounts.id = profiles.id_account WHERE accounts.id!=? \
			'+filter, [id], function (err, result, fields) {
					if (err) throw err
					callback(result);
			});
		})
	})
}
