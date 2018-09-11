/************************
** USE `NPM RUN RESET` **
*************************/
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456"
});

var sql = 'DROP DATABASE IF EXISTS `matcha`';

connection.connect(err => {
if (err) throw err;
  console.log('Connected !');
  connection.query(sql, (err, result) => {
    if (err) throw err;
    else {
        console.log('Database matcha droped');
        connection.end();
    }
  });
});