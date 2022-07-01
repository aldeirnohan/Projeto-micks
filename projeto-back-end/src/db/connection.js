const mysql = require("mysql2/promise");
const connection = mysql.createPool({
  host:'mysql',
  port: 3306,
  database: 'livros',
  user: 'root',
  password: 'mysqlpw'
});

module.exports = connection;