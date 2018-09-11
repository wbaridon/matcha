var db = require('../config/db');

module.exports.createUser = function (user, id_account) {
	db.query('INSERT INTO profiles\
		(id_account, name, firstname) \
		VALUES (?,?,?)',
	 	[id_account, user.name, user.firstname],
		function (err, result) {
			if (err) throw err;
			else {
				console.log('Profile created');
			}
		});
}

module.exports.updateUser = function (id_account, column, value, callback) {
		db.query("UPDATE profiles\
        SET " + column + "=?\
        WHERE id_account = ?",
        [value, id_account],
        callback);
}

module.exports.select = function (id_account, callback) {
    db.query('SELECT * FROM profiles\
        WHERE id_account = ?',
        [id_account],
        callback);
}
