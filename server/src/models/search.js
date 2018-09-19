var db = require('../config/db');
var sexualCheck = require('../utils/sexualCheck');
var interest = require('../utils/interests');

module.exports.result = function (id, gender, sexualPref, ask, askInterest, callback) {
	filter = ''
	if (ask.minAge) { filter+=' AND age>='+ask.minAge }
	if (ask.maxAge) { filter+=' AND age<='+ask.maxAge }
	if (ask.minPop) { filter+=' AND popularite>='+ask.minPop }
	if (ask.minDistance) { filter+=' AND popularite<='+ask.minDistance }
	sexualCheck.analysis(sexualPref, gender, preference => {
		sexualCheck.sqlSentence(preference, ret => {
			filter += ret
			interest.checkInterests(askInterest, finalRet => {
				finalFilter = filter + finalRet
				db.query('SElECT * FROM accounts INNER JOIN profiles \
				ON accounts.id = profiles.id_account INNER JOIN interests ON accounts.id = interests.id_account WHERE accounts.id!=? \
				'+filter, [id], function (err, result, fields) {
						if (err) throw err
						callback(result);
				});
			})
		})
	})
}
