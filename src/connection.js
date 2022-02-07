const { createConnection } = require("mysql");

const connection = createConnection({
  // create the connection here using the dbConfig
});

module.exports = connection;
