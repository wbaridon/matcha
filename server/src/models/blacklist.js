var db = require('../config/db');

module.exports.blockUser = function (id_blocked, id_by, callback) {
	db.query('INSERT INTO blacklist\
		(id_blocked, id_by) \
		VALUES (?, ?)',
	 	[id_blocked, id_by],
		callback);
}

module.exports.getList = function (id, callback) {
	db.query('SELECT * FROM blacklist WHERE id_by=?',
		[id], function (err, result) {
			if (err) throw err;
			else {
				callback(result)
			}
		});
}
