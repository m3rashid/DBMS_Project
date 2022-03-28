const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const { checkAuth, checkAdmin } = require("../middlewares/jwt.auth");
const pool = require("../utils/database");

router.post("/getUsers", checkAuth, checkAdmin, async (req, res) => {
  try {
    const db = await pool.getConnection();
    const [users, _] = await db.query("select * from User");
    db.release();

    return res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/getUser", checkAuth, checkAdmin, async (req, res) => {
  const { userID } = req.body;
  try {
    if (!userID) throw new Error("User not found");

    const db = await pool.getConnection();
    const [users, _] = await db.query("select * from User where userID = ?", [
      userID,
    ]);
    db.release();

    return res.status(200).json({
      user: users[0],
    });
  } catch {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/deleteUser", checkAuth, checkAdmin, async (req, res) => {
  const { userID, avatarID } = req.body;
  try {
    if (!userID) throw new Error("User not found");

    const db = await pool.getConnection();
    await db.query("delete from Post where userID = ?", [userID]);
    await db.query("delete from User where userID = ?", [userID]);
    await db.query("delete from Avatar where avatarID = ?", [avatarID]);
    const [users, _] = await db.query("select * from User");
    const [posts, __] = await db.query("select * from Post");
    db.release();

    return res.status(200).json({
      message: "User deleted",
      users,
      posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/topics", checkAuth, async (req, res) => {
  try {
    const db = await pool.getConnection();
    const [topics, ___] = await db.query("select * from Topic");
    db.release();

    return res.status(200).json({
      topics,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/createTopic", checkAuth, checkAdmin, async (req, res) => {
  const { topicName } = req.body;
  try {
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/updateTopic", checkAuth, checkAdmin, async (req, res) => {
  const { topicName, topicID } = req.body;

  try {
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/deleteTopic", checkAuth, checkAdmin, async (req, res) => {
  const { topicID } = req.body;
  try {
    if (!topicID) throw new Error("No topic");
    const db = await pool.getConnection();

    await db.query("delete from Topic where topicID = ?", [topicID]);
    const [topics, _] = await db.query("select * from Topic");
    db.release();

    return res.status(200).json({
      message: "Topic Deleted successfully",
      topics,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/deletePost", checkAuth, checkAdmin, async (req, res) => {
  const { postID } = req.body;

  try {
    if (!postID) throw new Error("Post not found ");

    const db = await pool.getConnection();
    await db.query("delete from Post where postID = ?", [postID]);
    const [posts, _] = await db.query("select * from Post");
    db.release();

    return res.status(200).json({
      message: "Post Deleted successfully",
      posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
