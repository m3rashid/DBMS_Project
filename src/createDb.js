const { exec } = require("child_process");

// configuration of the database
// like name, username, password of the database

// DO NOT push to git with these data filled
const dbConfig = {
  dbName: "",
  host: "",
  user: "",
  password: "",
};

// query to create a database using the dbConfig
const sqlQueryToCreateDatabase = ``;

const createDatabaseIfNotExists = () => {
  exec(sqlQueryToCreateDatabase, (err, stdout, stderr) => {
    if (err) {
      // some error occured in creating the database
      console.log("could not connect to the database");
      console.log(`INFO: ${err.message}`);
      process.exit(1);
    }
    if (stderr) {
      // database already exists
      console.log("database already exists");
      return;
    }
    console.log(`INFO: ${stdout}`);
  });
};

module.exports = { createDatabaseIfNotExists, dbConfig };
