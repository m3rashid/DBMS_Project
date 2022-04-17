require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// used for deployment
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "PROD"
//         ? "https://jmi-connect.netlify.app"
//         : "http://localhost:3000",
//     optionsSuccessStatus: 200,
//   })
// );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./src/routes"));

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    message:
      process.env.NODE_ENV !== "production"
        ? JSON.stringify(err.message) || "Internal Server Error"
        : "Internal Server Error",
  });
});

// app.use(
//   "/update",
//   // authRateLimiter,
//   updateUser
// );

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("INFO: ⚡⚡⚡ Server running ⚡⚡⚡"));
