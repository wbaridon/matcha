var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456"
});

connection.connect();
connection.query('CREATE DATABASE IF NOT EXISTS matcha')

console.log('Database matcha created')
connection.query ('USE matcha')

var sql = 'CREATE TABLE IF NOT EXISTS accounts \
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, activation INT DEFAULT 0, login VARCHAR(50), \
password VARCHAR(128), email VARCHAR(50)); \
          CREATE TABLE IF NOT EXISTS profiles \
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, id_account INT NOT NULL, name VARCHAR(50), \
firstname VARCHAR(50), gender TINYINT DEFAULT 0, sexuality TINYINT DEFAULT 0, bio TEXT); \
          CREATE TABLE IF NOT EXISTS interests \
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, id_account INT NOT NULL, geek TINYINT DEFAULT 0, \
bio TINYINT DEFAULT 0, vegan TINYINT DEFAULT 0, piercing TINYINT DEFAULT 0, \
beard TINYINT DEFAULT 0, tall TINYINT DEFAULT 0, fat TINYINT DEFAULT 0, \
skinny TINYINT DEFAULT 0, sport TINYINT DEFAULT 0, drink TINYINT DEFAULT 0);';


connection.query(sql);
console.log('Table accounts created')

connection.end()
