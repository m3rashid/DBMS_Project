const { Pool } = require("pg");
const env = process.env.NODE_ENV;

const pool = new Pool({
  host: env === "PROD" ? process.env.DB_HOST : "localhost",
  user: env === "PROD" ? process.env.DB_USER : process.env.LOCAL_DB_USER,
  port: 5432,
  password: env === "PROD" ? process.env.DB_PASS : process.env.LOCAL_DB_PASS,
  database: env === "PROD" ? process.env.DATABASE : process.env.LOCAL_DATABASE,
});

module.exports = pool;
