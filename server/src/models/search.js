var db = require('../config/db');

module.exports.result = function (id, gender, sexualPref, ask, callback) {
	filter = ''
	if (ask.minAge) { filter+=' AND age>='+ask.minAge }
	if (ask.maxAge) { filter+=' AND age<='+ask.maxAge }
	if (ask.minPop) { filter+=' AND popularite>='+ask.minPop }
	if (ask.maxPop) { filter+=' AND popularite<='+ask.maxPop }
	sexualAnalysis(sexualPref, gender, preference => {
		foodAnalysis(preference, ret => {
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

function	sexualAnalysis(sexualPref, gender, preference)
{
	switch (sexualPref) {
		case 0: // Hetero
			if (gender === 0) {
				preference('H-F') // Homme souhaite femme
			} else {
				preference('F-H') // Femme souhaite homme
			}
			break;
		case 1: // Homo
			if (gender === 0) {
				preference('H-H') // Homme souhaite homme
			} else {
				preference('F-F') // Femme souhaite femme
			}
			break;
			case 2: // Bixuel
				if (gender === 0) {
					preference('H-HF') // Homme souhaite femme et homme
				} else {
					preference('F-FH') // Femme souhaite femme et homme
				}
				break;
	}
}

function	foodAnalysis(preference, ret) {
	switch (preference) {
		case 'H-F':
			ret(' AND (gender=1 AND (sexuality=0 OR sexuality=2))')
			break;
		case 'F-H':
			ret(' AND (gender=0 AND (sexuality=0 OR sexuality=2))')
			break;
		case 'H-H':
			ret(' AND (gender=0 AND (sexuality=1 OR sexuality=2))')
			break;
		case 'F-F':
			ret(' AND (gender=1 AND (sexuality=1 OR sexuality=2))')
			break;
		case 'H-HF':
			ret(' AND ((gender=1 AND (sexuality=0 OR sexuality=2)) OR (gender=0 AND (sexuality=1 OR sexuality=2)))')
			break;
		case 'F-HF':
			ret(' AND ((gender=1 AND (sexuality=1 OR sexuality=2)) OR (gender=0 AND (sexuality=0 OR sexuality=2)))')
			break;
	}
}
