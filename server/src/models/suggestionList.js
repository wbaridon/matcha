var db = require('../config/db');
var sexualCheck = require('../utils/sexualCheck');

module.exports.showList = function (id, gender, sexualPref, callback) {
	filter = ''
	sexualCheck.analysis(sexualPref, gender, preference => {
		sexualCheck.sqlSentence(preference, ret => {
			filter += ret
			db.query('SElECT * FROM accounts INNER JOIN profiles \
			ON accounts.id = profiles.id_account \
			INNER JOIN images AS i ON accounts.id = i.id_account WHERE accounts.id!=? \
			'+filter, [id], function (err, result, fields) {
					if (err) throw err
					callback(result);
			});
		})
	})
}
