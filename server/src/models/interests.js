var db = require('../config/db');

module.exports.createUser = function (id_account) {
	db.query('INSERT INTO interests\
		(id_account) \
		VALUES (?)',
	 	[id_account],
		function (err, result) {
			if (err) throw err;
			else {
				console.log('Interest created');
			}
		});
}
