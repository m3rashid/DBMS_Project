const { createConnection } = require("mysql");
import { dbConfig } from "./createDb";

const connection = createConnection({
  // create the connection here using the dbConfig
});

module.exports = connection;
