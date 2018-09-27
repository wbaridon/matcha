var db = require('../config/db');

module.exports.storeMessage = function (newMessage) {
	db.query('INSERT INTO chat \
		(login, recipient, message) \
		VALUES (?,?,?)',
	 	[newMessage.userid, newMessage.recipient, newMessage.message],
		function (err, result) {
			if (err) throw err;
			else {
				console.log('Message stored');
			}
		});
}

// Gets all messages from history between 2 specific users
module.exports.getMessages = function (login, recipient, callback) {
  db.query('SELECT accounts.login, chat.message, chat.id \
	FROM accounts \
	INNER JOIN chat \
	ON chat.login=accounts.id \
	WHERE chat.login=? AND chat.recipient=? \
	OR chat.login=? AND chat.recipient=?',
      [login, recipient, recipient, login],
      callback);
}

// Gets login from ID
module.exports.getUsernameFromId = function (id, callback) {
  db.query('SELECT login FROM accounts WHERE id = ?',
    id,
		callback);
}
