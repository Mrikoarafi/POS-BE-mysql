const env = require("../../helpers/v1/env");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASS,
  database: env.MYSQL_DB,
});

module.exports = connection;
