require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {
  regularRateLimiter,
  authRateLimiter,
} = require("./src/utils/rateLimit");

// const updateUser = require("./src/handlers/updateUser");
// const post = require("./src/handlers/post");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", /* authRateLimiter, */ require("./src/handlers/auth"));
app.use("/admin", /* regularRateLimiter, */ require("./src/handlers/admin"));
app.use("/post", /* regularRateLimiter, */ require("./src/handlers/post"));
// app.use(
//   "/update",
//   // authRateLimiter,
//   updateUser
// );

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("INFO: Server is running on port ", port);
});
