const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const getUsers = async (req, res) => {
  const db = await pool.getConnection();
  const [users, _] = await db.query("select * from User");
  db.release();

  return res.status(200).json({ users });
};

const getOneUser = async (req, res) => {
  const { userID } = req.body;
  if (!userID) throw new Error("User not found");

  const db = await pool.getConnection();
  const [users, _] = await db.query("select * from User where userID = ?", [
    userID,
  ]);
  db.release();

  return res.status(200).json({ user: users[0] });
};

const deleteUser = async (req, res) => {
  const { userID, avatarID } = req.body;
  if (!userID) throw new Error("User not found");

  const db = await pool.getConnection();
  await db.query("delete from Post where userID = ?", [userID]);
  await db.query("delete from User where userID = ?", [userID]);
  await db.query("delete from Avatar where avatarID = ?", [avatarID]);
  const [users, _] = await db.query("select * from User");
  const [posts, __] = await db.query("select * from Post");
  db.release();

  return res.status(200).json({ message: "User deleted", users, posts });
};

const getTopics = async (req, res) => {
  const db = await pool.getConnection();
  const [topics, ___] = await db.query("select * from Topic");
  db.release();

  return res.status(200).json({ topics });
};

const createTopic = async (req, res) => {
  const { topicName } = req.body;
  if (!topicName) throw new Error("NO topic name ");
  const topicId = uuidv4();

  const db = await pool.getConnection();
  await db.query("insert into Topic (topicID, name) values (?, ?)", [
    topicId,
    topicName,
  ]);
  const [topics, _] = await db.query("select * from Topic");
  db.release();

  return res.status(200).json({
    message: "Topic created successfully",
    topics,
  });
};

const updateTopic = async (req, res) => {
  const { topicName, topicID } = req.body;
  if (!topicName || !topicID) throw new Error("NO topic");

  const db = await pool.getConnection();
  await db.query(
    "update Topic set name = ?, updatedAt = CURRENT_TIMESTAMP(3) where topicID = ?",
    [topicName, topicID]
  );
  const [topics, _] = await db.query("select * from Topic");
  db.release();

  return res.status(200).json({
    message: "Topic Updated successfully",
    topics,
  });
};

const deleteTopic = async (req, res) => {
  const { topicID } = req.body;
  if (!topicID) throw new Error("No topic");
  const db = await pool.getConnection();

  await db.query("delete from Topic where topicID = ?", [topicID]);
  const [topics, _] = await db.query("select * from Topic");
  db.release();

  return res.status(200).json({
    message: "Topic Deleted successfully",
    topics,
  });
};

const deletePost = async (req, res) => {
  const { postID } = req.body;
  if (!postID) throw new Error("Post not found ");

  const db = await pool.getConnection();
  await db.query("START TRANSACTION");
  await db.query("delete from Comments where postID = ?", [postID]);
  await db.query("delete from Classification where postID = ?", [postID]);
  await db.query("delete from Post where postID = ?", [postID]);
  const [posts, _] = await db.query("select * from Post");
  await db.query("COMMIT");
  db.release();

  return res.status(200).json({ message: "Post Deleted successfully", posts });
};

module.exports = {
  getUsers,
  getOneUser,
  deleteUser,
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
  deletePost,
};
