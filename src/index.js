require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("*", (req, res) => {
  return res.status(200).json({
    message: "Hello from server",
  });
});

// handle post routes here

// spin up the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // before starting the server, make sure that the database is connected
  // use the create database if not exists function
  console.log("INFO: Server is running on port ", port);
});
