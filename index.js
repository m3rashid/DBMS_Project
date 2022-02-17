require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = (module.exports = express());
const database = require("./src/utils/database");
const {
  authRateLimiter,
  regularRateLimiter,
} = require("./src/utils/rateLimit");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await database(app);

  app.all("*", (req, res) => {
    return res.status(200).json({
      message: "Hello from server",
    });
  });
  console.log("INFO: Server is running on port ", port);
});
