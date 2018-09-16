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

module.exports.updateProfilePic = function (idAccount, id, callback) {
	db.query("UPDATE images\
	 SET isProfile=0 WHERE id_account = ?",
	 [idAccount], result => {
		 db.query("UPDATE images\
					SET isProfile=1\
					WHERE id = ?",
					[id],
					callback);
	 })

}

module.exports.select = function (id_account, callback) {
    db.query('SELECT * FROM profiles\
        WHERE id_account = ?',
        [id_account],
        callback);
}

module.exports.addPic = function (id_account, isProfile, filename, callback) {
	db.query('INSERT INTO images\
		(id_account, isProfile, filename)\
		VALUES (?,?,?)',
		[id_account, isProfile, filename], function (err, result) {
			if (err) throw err;
			else {
				callback(result)
			}
		});
}

module.exports.getPic = function (id, callback) {
	db.query('SELECT * FROM images WHERE id_account=?',
		[id], function (err, result) {
			if (err) throw err;
			else {
				callback(result)
			}
		});
}

module.exports.deletePic = function (idAccount, id, callback) {
	db.query('DELETE FROM images WHERE id_account=? AND id =?',
		[idAccount, id], function (err, result) {
			if (err) throw err;
			else {
				callback(result)
			}
		});
}
