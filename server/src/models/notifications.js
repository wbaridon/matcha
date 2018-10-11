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

module.exports.getLikeAction = function (emitter, receiver, callback) {
  db.query('SELECT * FROM notifications WHERE id_account =? AND emitter =? AND (action=3 OR action=0)',
  [receiver, emitter],
  callback);
}

module.exports.changeAction = function (action, newAction, emitter, receiver, callback) {
  db.query('UPDATE notifications SET action=? WHERE id_account=? AND emitter=? AND action=?',
  [newAction, receiver, emitter, action],
  callback);
}

module.exports.deleteAction = function (action, id_account, emitter, callback) {
  db.query('DELETE FROM notifications WHERE id_account=? AND action=? AND emitter = ?',
    [id_account, action, emitter],
    callback);
}

module.exports.updateAction = function (id_account, callback) {
  db.query('UPDATE notifications SET readed = 1 WHERE id_account = ?', [id_account], callback);
}

module.exports.count = function (id, callback) {
  db.query('SELECT COUNT(*) AS nb FROM notifications where id_account = ? AND readed = 0', id, callback)
}
