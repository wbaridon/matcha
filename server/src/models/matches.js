var db = require('../config/db');

// Gets all matches from someone as receiver
module.exports.getMatchesAsReceiver = function (userid, callback) {
  db.query('SELECT n.*, p.firstname  \
	FROM notifications AS n INNER JOIN profiles AS p \
  ON p.id_account = n.emitter\
	WHERE n.id_account = ? \
 	AND n.action = 4',
  userid,
  callback);
}

// Gets all matches from someone as emitter
module.exports.getMatchesAsEmitter = function (userid, callback) {
  db.query('SELECT n.*, p.firstname  \
	FROM notifications AS n INNER JOIN profiles AS p \
  ON p.id_account = n.id_account\
	WHERE n.emitter = ? \
 	AND n.action = 4',
  userid,
  callback);
}


// Check if user matched before (returns either FILLED ARRAY or EMPTY ARRAY)
module.exports.checkMatched = function (userid, recipient, callback) {
  db.query('SELECT * \
  FROM notifications \
  WHERE action = 4 AND ((id_account = ? AND emitter = ?) OR (id_account = ? AND emitter = ?))',
  [userid, recipient, recipient, userid], callback);
}
