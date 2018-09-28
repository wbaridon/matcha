var db = require('../config/db');

// Gets all matches from someone
module.exports.getMatches = function (userid, callback) {
  db.query('SELECT n.*, p.firstname  \
	FROM notifications AS n INNER JOIN profiles AS p \
  ON p.id_account = n.emitter\
	WHERE n.id_account = ? \
 	AND n.action = 4',
  userid,
  callback);
}

// Check if user matched before (returns either FILLED ARRAY or EMPTY ARRAY)
module.exports.checkMatched = function (userid, recipient, callback) {
  db.query('SELECT * \
  FROM notifications \
  WHERE id_account = ? AND action = ? AND emitter = ?',
  [userid, 4, recipient, recipient, 4, userid], callback);
}
