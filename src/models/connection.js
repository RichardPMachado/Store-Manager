const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});
// const connection = mysql.createPool({
//   host: process.env.MYSQL_HOST || 'localhost',
//   port: process.env.PORT || 3306,
//   user: 'root',
//   password: 'password',
//   database: 'StoreManager',
// });

module.exports = connection;
