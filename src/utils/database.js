const pgp = require("pg-promise");

const client = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 5432,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
};

const db = pgp(client);

module.exports = db;
