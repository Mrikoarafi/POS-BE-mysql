//*code tersembunyi (dotenv)

require("dotenv").config();
const env = {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASS: process.env.MYSQL_PASS,
  MYSQL_DB: process.env.MYSQL_DB,
  PORT: process.env.PORT,
  EMAILGMAIL: process.env.EMAILGMAIL,
  PASSGMAIL: process.env.PASSGMAIL,
  URLPOSTMAN: process.env.URLPOSTMAN,
  JWTSECRET_USERS: process.env.JWTSECRET_USERS,
  JWTSECRET_ADMINS: process.env.JWTSECRET_ADMINS,
};

module.exports = env;
