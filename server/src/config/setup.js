/************************
** USE `NPM RUN SETUP` **
*************************/
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456"
});

var sql = ['\
CREATE TABLE IF NOT EXISTS accounts ( \
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    activation INT DEFAULT 0, \
    login VARCHAR(50), \
    password VARCHAR(128), \
    email VARCHAR(50), \
    timestamp BIGINT NOT NULL);',' \
\
CREATE TABLE IF NOT EXISTS profiles ( \
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    id_account INT NOT NULL, \
    name VARCHAR(50), \
    firstname VARCHAR(50), \
    gender TINYINT DEFAULT 0, \
    age INT NOT NULL DEFAULT 0, \
    sexuality TINYINT DEFAULT 0, \
    bio TEXT);',' \
\
CREATE TABLE IF NOT EXISTS interests ( \
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    id_account INT NOT NULL, \
    geek TINYINT DEFAULT 0, \
    bio TINYINT DEFAULT 0, \
    vegan TINYINT DEFAULT 0, \
    piercing TINYINT DEFAULT 0, \
    beard TINYINT DEFAULT 0, \
    tall TINYINT DEFAULT 0, \
    fat TINYINT DEFAULT 0, \
    skinny TINYINT DEFAULT 0, \
    sport TINYINT DEFAULT 0, \
    drink TINYINT DEFAULT 0);'];

connection.connect(err => {
if (err) throw err;
  console.log('Connected !');
  connection.query('CREATE DATABASE IF NOT EXISTS matcha', (err, result) => {
    if (err) throw err;
    console.log('Database matcha created');
    connection.query('USE matcha', (err, result) => {
      if (err) throw err;
      console.log('Database matcha selected');
      sql.forEach((elem, index) => {
        connection.query(elem);
        if (sql.length - 1 == index)
        {
          console.log('All tables created');
          connection.end();
        }
      });     
    });
  });
});