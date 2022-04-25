require("dotenv").config();
const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const http = require("http");

const { chatHandler } = require("./src/handlers/chat");

const corsOrigin =
  process.env.NODE_ENV === "PROD"
  ? "http://localhost:3000"
    : "https://jmi-connect.netlify.app";

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: corsOrigin, methods: ["GET", "POST"], credentials: true },
});
io.on("connection", (socket) => chatHandler(io, socket));

app.use(xss());
app.use(helmet());
app.use(cors({ origin: corsOrigin, optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./src/routes"));

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    message:
      process.env.NODE_ENV !== "PROD"
        ? JSON.stringify(err.message) || "Internal Server Error"
        : "Internal Server Error",
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("INFO: Server running ..."));
