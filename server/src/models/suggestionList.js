var db = require('../config/db');
var sexualCheck = require('../utils/sexualCheck');
var interestsCheck = require('../utils/interestsCheck');

module.exports.showList = function (id, gender, sexualPref, ask, askInterest, callback) {
	filter = ''
	if (ask.minAge) { filter+=' AND age>='+ask.minAge }
	if (ask.maxAge) { filter+=' AND age<='+ask.maxAge }
	if (ask.minPop) { filter+=' AND popularite>='+ask.minPop }
	if (ask.maxPop) { filter+=' AND popularite<='+ask.maxPop }
	sexualCheck.analysis(sexualPref, gender, preference => {
		sexualCheck.sqlSentence(preference, ret => {
			filter += ret
			interestsCheck.checkInterests(askInterest, finalRet => {
				finalFilter = filter + finalRet
				db.query('SElECT * FROM accounts INNER JOIN profiles \
				ON accounts.id = profiles.id_account \
				INNER JOIN interests ON accounts.id = interests.id_account \
				INNER JOIN images AS i ON accounts.id = i.id_account WHERE accounts.id!=? \
				'+finalFilter, [id], function (err, result, fields) {
						if (err) throw err
						callback(result);
				});
			})
		})
	})
}
