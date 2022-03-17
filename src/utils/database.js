const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: env === "PROD" ? process.env.DB_HOST : process.env.LOCAL_DB_HOST,
  user: env === "PROD" ? process.env.DB_USER : process.env.LOCAL_DB_USER,
  password: env === "PROD" ? process.env.DB_PASS : process.env.LOCAL_DB_PASS,
  database: env === "PROD" ? process.env.DATABASE : process.env.LOCAL_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(path.join(__dirname, "./keys/ca.pem"), "utf-8")],
  },
});

module.exports = pool;
