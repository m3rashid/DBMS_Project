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
  const { userID,avatarID } = req.body;
  try {
    if (!userID) throw new Error("User not found");

    const db = await pool.getConnection();
    //firstly deleting all the posts of that user
    const [_, __] = await db.query("delete from Post where userID = ?", [
      userID,
    ]);

    //then deleting the user
    const [___, ____] = await db.query("delete from User where userID = ?", [
      userID,
    ]);

    //then deleting the avatar
    const [_____, ______] = await db.query("delete from Avatar where avatarID = ?", [
      avatarID,
    ]);
    db.release();

    return res.status(200).json({
      message: "User deleted",
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
    const [_, __] = await db.query(
      "insert into Topic (topicID, name) values (?, ?)",
      [topicId, topicName]
    );
    db.release();

    return res.status(200).json({
      message: "Topic created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/deleteTopic", checkAuth, checkAdmin, async (req, res) => {
  const { topicName } = req.body;
 
  try {
    if (!topicName) throw new Error("NO topic name ");

    const db = await pool.getConnection();

    //deleting topic
    const [_, __] = await db.query("delete from Topic where name = ?", [
      topicName,
    ]);
    db.release();

    return res.status(200).json({
      message: "Topic Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
