require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = (module.exports = express());
const database = require("./src/utils/database");
const {
  regularRateLimiter,
  authRateLimiter,
} = require("./src/utils/rateLimit");

const auth = require("./src/handlers/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await database(app);
  app.use("/auth", authRateLimiter, auth);

  app.all("*", regularRateLimiter, (req, res) => {
    return res.status(200).json({
      message: "Hello from server",
    });
  });

  console.log("INFO: Server is running on port ", port);
});
