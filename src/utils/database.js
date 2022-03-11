const mysql = require("mysql");

const env = process.env.NODE_ENV;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: env === "PROD" ? process.env.DB_HOST : process.env.LOCAL_DB_HOST,
  user: env === "PROD" ? process.env.DB_USER : process.env.LOCAL_DB_USER,
  password: env === "PROD" ? process.env.DB_PASS : process.env.LOCAL_DB_PASS,
  database: env === "PROD" ? process.env.DATABASE : process.env.LOCAL_DATABASE,
});

module.exports = pool;
