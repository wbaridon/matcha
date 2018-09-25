var db = require('../config/db');

module.exports.storeMessage = function (newMessage) {
	db.query('INSERT INTO chat \
		(login, recipient, message) \
		VALUES (?,?,?)',
	 	[newMessage.id, newMessage.recipient, newMessage.message],
		function (err, result) {
			if (err) throw err;
			else {
				console.log('Message stored');
			}
		});
}

// Gets all messages from history between 2 specific users
module.exports.getMessages = function (login, recipient, callback) {
  db.query('SELECT accounts.login, chat.message FROM accounts INNER JOIN chat ON chat.login=accounts.id',
      [login, recipient, login, recipient],
      callback);
}

// Gets login from ID
module.exports.getUsernameFromId = function (id, callback) {
  db.query('SELECT login FROM accounts WHERE id = ?',
    id,
		callback);
}
