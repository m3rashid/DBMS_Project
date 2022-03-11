require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {
  regularRateLimiter,
  authRateLimiter,
} = require("./src/utils/rateLimit");

const auth = require("./src/handlers/auth");
const updateUser = require("./src/handlers/updateUser");
const post = require("./src/handlers/post");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/auth",
  // authRateLimiter,
  auth
);
app.use(
  "/update",
  // authRateLimiter,
  updateUser
);
app.use(
  "/post",
  // regularRateLimiter,
  post
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("INFO: Server is running on port ", port);
});
