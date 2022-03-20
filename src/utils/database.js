const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV;

const localPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASS,
  database: process.env.LOCAL_DATABASE,
});

const prodPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(path.join(__dirname, "./keys/ca.pem"), "utf-8")],
  },
});

const pool = env === "PROD" ? prodPool : localPool;
module.exports = pool;
