var db = require('../config/db');

module.exports.getAll = function (id_account, callback) {
    db.query('SELECT * FROM notifications\
        WHERE id_account = ?',
        [id_account],
        callback);
}

module.exports.newAction = function (action, id_account, emitter, callback) {
    db.query('INSERT INTO notifications\
  		(id_account, action, emitter) \
  		VALUES (?,?,?)',
      [id_account, action, emitter],
      callback);
}

module.exports.getAllFrom = function (id_account, action, callback) {
    db.query('SELECT * FROM notifications\
        WHERE id_account = ? AND action=?',
        [id_account, action],
        callback);
}
module.exports.getActionsFromEmitter = function (emitter, action, callback) {
    db.query('SELECT * FROM notifications\
        WHERE emitter = ? AND action=?',
        [emitter, action],
        callback);
}
