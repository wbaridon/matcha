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

module.exports.getUser = function (id, callback) {
	db.query('SELECT * FROM interests WHERE id_account=?',
		[id], function (err, result) {
			if (err) throw err;
			else {
				callback(result)
			}
		});
}

module.exports.update = function (interest, id, value, callback) {
	db.query('UPDATE interests SET '+interest+' =? WHERE id_account=?',
		[value, id], function (err, result) {
			if (err) throw err;
			else {
				callback(result)
			}
		});
}

module.exports.addNew = function (interest, id, callback) {
	console.log('arrive')
	db.query("ALTER TABLE interests ADD "+ interest + " TINYINT DEFAULT 0", callback, function (err, result) {
		if (err) throw err;
		else {
			console.log('iciicici')
			callback(result)
		}
	});
}

module.exports.getInterestsList = function (callback) {
	db.query('SELECT column_name\
	 FROM information_schema.columns\
	 WHERE table_schema="matcha" AND table_name="interests"\
	 AND column_name!="id" AND column_name!="id_account"', function(err, result) {
		 if (err) throw err;
		 else callback(result)
	 });
}
