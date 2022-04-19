require("dotenv").config();
const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const http = require("http");

const { chatHandler } = require("./src/handlers/chat");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "PROD"
        ? "https://jmi-connect.netlify.app"
        : "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => chatHandler(io, socket));

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

app.use(xss());
app.use(helmet());
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

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("INFO: Server running ..."));
