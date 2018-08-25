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
    db.query('UPDATE profiles\
        SET ? = ?\
        WHERE id_account = ?',
        [column, value, id_account],
        callback(err, result));
}

selectValue = function (id_account, value, callback) {
    db.query('SELECT ? INTO profiles\
        WHERE id_account = ?',
        [value, id_account],
        callback(err, result));
}

module.exports.selectName = (id_account, callback) => {
    selectValue(id_account, 'name', callback);
};
module.exports.selectFirstname = (id_account, callback) => {
    selectValue(id_account, 'firstname', callback);
};
module.exports.selectGender = (id_account, callback) => {
    selectValue(id_account, 'gender', callback);
};
module.exports.selectSexuality = (id_account, callback) => {
    selectValue(id_account, 'sexuality', callback);
};
module.exports.selectBio = (id_account, callback) => {
    selectValue(id_account, 'bio', callback);
};
