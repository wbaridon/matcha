var db = require('../config/db');

module.exports.storeMessage = function (newMessage) {
	db.query('INSERT INTO chat \
		(login, recipient, message) \
		VALUES (?,?,?)',
	 	[newMessage.login, newMessage.recipient, newMessage.message],
		function (err, result) {
			if (err) throw err;
			else {
				console.log('Message stored');
			}
		});
}

// Gets all messages from history between 2 specific users
module.exports.getMessages = function (login, recipient, callback) {
  db.query('SELECT * FROM chat WHERE login = ? OR login = ? \
    AND recipient = ? OR recipient = ?',
      [login, recipient, login, recipient],
      callback);
}

// Gets login from ID
module.exports.getUsernameFromId = function (id, callback) {
  db.query('SELECT * FROM accounts WHERE id = ?',
    id,
		callback);
}
