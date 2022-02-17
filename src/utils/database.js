const mysql = require("mysql");
const fs = require("fs");

var config = {
  // using mysql-version: 8.0
  host: "dbms-project.mysql.database.azure.com",
  user: "dbmsAdmin@dbms-project",
  password: process.env.DB_PASSWORD,
  database: "mysql",
  port: 3306,
  ssl: {
    ca: fs.readFileSync(__dirname + "/keys/db_ssl_certificate.pem"),
  },
};

const database = async (app) => {
  const conn = new mysql.createConnection(config);
  try {
    await conn.connect();
    app.locals.db = conn;
    console.log("Connection established.");
  } catch (err) {
    console.log("!!! Cannot connect !!! Error:");
  }
};

module.exports = database;
