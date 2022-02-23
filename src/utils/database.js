const mysql = require("mysql");
const fs = require("fs");
const util = require("util");

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

const connection = async (app) => {
  try {
    const conn = await new mysql.createConnection(config);
    const query = util.promisify(conn.query).bind(conn);
    app.locals.db = conn;
    app.locals.query = query;
    console.log("Got connection to database");
  } catch (err) {
    console.log("!!! Cannot connect !!! Error:");
  }
};

module.exports = connection;
