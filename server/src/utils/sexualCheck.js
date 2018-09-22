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

function convertUserData(user, callback) {
	var counter = user.length;
	user.forEach(function (item, index, array) {
		switch (item.gender) {
	    case 0:
	      item.gender = 'Homme';
	      break;
	    case 1:
	      item.gender = "Femme";
	      break;
	  }
		switch (item.sexuality) {
	    case 0:
	      item.sexuality = 'Hetero';
	      break;
	    case 1:
	      item.sexuality = 'Homo';
	      break;
	    case 2:
	      item.sexuality = 'Bisexuel';
	      break;
	  }
		counter--
		if (counter === 0) {
			callback(array)
		}
	})

}

module.exports.analysis = sexualAnalysis;
module.exports.sqlSentence = foodAnalysis;
module.exports.convertUserData = convertUserData;
