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

connection.query('CREATE TABLE IF NOT EXISTS accounts (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, login VARCHAR(50), password VARCHAR(128))')
console.log('Table accounts created')

connection.end()