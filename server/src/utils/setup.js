/************************
** USE `NPM RUN SETUP` **
*************************/
const config = require('../config/config');

const NBR_OF_INTERESTS = config.interests.length;
let SQL_INTERESTS = '';
for (let i = 0; i < NBR_OF_INTERESTS; i++) {
    SQL_INTERESTS += '`' + config.interests[i] + '`' + ' TINYINT DEFAULT 0';
    if (i !== NBR_OF_INTERESTS - 1)
        SQL_INTERESTS += ', ';
}
/******************************************************************************/

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
    isOnline INT DEFAULT 0, \
    lastVisit DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
    timestamp BIGINT NOT NULL, \
    timestampPassword BIGINT DEFAULT 0);',' \
\
CREATE TABLE IF NOT EXISTS profiles ( \
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    id_account INT NOT NULL, \
    name VARCHAR(50), \
    firstname VARCHAR(50), \
    gender TINYINT DEFAULT 0, \
    age INT NOT NULL DEFAULT 0, \
    sexuality TINYINT DEFAULT 2, \
    bio TEXT, zipcode INT, city VARCHAR(50), latitude DECIMAL(12,9), longitude DECIMAL(12,9), \
    popularite INT NOT NULL DEFAULT 0, fakeReport INT NOT NULL DEFAULT 0, isFill INT NOT NULL DEFAULT 0);',' \
\
CREATE TABLE IF NOT EXISTS images ( \
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    id_account INT NOT NULL, \
    filename VARCHAR(50), isProfile INT DEFAULT 0, isFake INT DEFAULT 0);',' \
\
CREATE TABLE IF NOT EXISTS chat ( \
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    login VARCHAR(50), \
    recipient VARCHAR(50), \
    message VARCHAR(200));',' \
\
CREATE TABLE IF NOT EXISTS blacklist ( \
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    id_blocked INT NOT NULL, \
    id_by INT NOT NULL);',' \
\
CREATE TABLE IF NOT EXISTS notifications (\
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    id_account INT NOT NULL, \
    action INT NOT NULL, \
    emitter INT NOT NULL, \
    readed INT DEFAULT 0);','\
\
CREATE TABLE IF NOT EXISTS interests ( \
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    id_account INT NOT NULL, \
    ' + SQL_INTERESTS + '\
    );'];

connection.connect(err => {
if (err) throw err;
  connection.query('CREATE DATABASE IF NOT EXISTS matcha', (err, result) => {
    if (err) throw err;
    console.log('Database matcha created');
    connection.query('USE matcha', (err, result) => {
      if (err) throw err;
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
