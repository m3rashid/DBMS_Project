const { v4: uuidv4 } = require("uuid");
const pool = require("../utils/database");

const newUserInChat =
  (io, socket) =>
  ({ userName, userID }) => {
    console.log(userName, userID);
    io.emit("user-joined-chat", {
      userName,
      timeStamp: new Date().toISOString(),
    });
  };

const userLeftChat =
  (io, socket) =>
  ({ userName, userID }) => {
    io.emit("user-left-chat", { userName, userID });
  };

const sendMessage =
  (io, socket) =>
  async ({ userName, userID, message }) => {
    try {
      const chatId = uuidv4();
      console.log(userName, userID, message);
      const db = await pool.getConnection();
      await db.query(
        "insert into Chat(id, userID, userName, message) values(?, ?, ?, ?)",
        [chatId, userID, userName, message]
      );
      db.release();
      const [chat, _] = await db.query("select * from Chat where id = ?", [
        chatId,
      ]);
      io.emit("receive-message", chat[0]);
    } catch (err) {
      console.log(err);
    }
  };

const chatHandler = (io, socket) => {
  socket.on("new-user-in-chat", newUserInChat(io, socket));
  socket.on("user-left-the-chat", userLeftChat(io, socket));
  socket.on("send-message", sendMessage(io, socket));
};

const getAllChats = async (req, res) => {
  const db = await pool.getConnection();
  const [chats, _] = await db.query("select * from Chat order by createdAt");
  db.release();
  return res.status(200).json({ chats });
};

module.exports = { chatHandler, getAllChats };
