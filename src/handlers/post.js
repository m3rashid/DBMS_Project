const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const pool = require("../utils/database");
const { checkAuth } = require("../middlewares/jwt.auth");

router.get("/all", checkAuth, async (req, res) => {
  try {
    const db = await pool.getConnection();
    const [posts, _] = await db.query(
      "select * from Post inner join User on Post.userID = User.userID inner join Avatar on User.avatarID = Avatar.avatarID inner join Topic on Post.topicID = Topic.topicID order by Post.updatedAt DESC"
    );
    db.release();
    return res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/one", checkAuth, async (req, res) => {
  const { postId } = req.body;
  try {
    if (!postId) throw new Error("No post ID");

    const db = await pool.getConnection();
    const [posts, _] = await db.query(
      "select * from Post inner join User on Post.userID = User.userID inner join Avatar on User.avatarID = Avatar.avatarID inner join Topic on Post.topicID = Topic.topicID where postID = ?",
      [postId]
    );
    db.release();
    return res.status(200).json({
      post: posts[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/fromTopic", checkAuth, async (req, res) => {
  const { topicId } = req.body;
  try {
    if (!topicId) throw new Error("No topic ID");

    const db = await pool.getConnection();
    const [posts, _] = await db.query(
      "select * from Post inner join User on Post.userID = User.userID inner join Avatar on User.avatarID = Avatar.avatarID inner join Topic on Post.topicID = Topic.topicID where Post.topicID = ? order by Post.updatedAt DESC",
      [topicId]
    );
    db.release();
    return res.status(200).json({
      posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/add", checkAuth, async (req, res) => {
  const { title, body, topicId, userId } = req.body;
  try {
    if (!title || !topicId || !userId)
      throw new Error("No title, topicId or userId");

    const postId = uuidv4();

    const db = await pool.getConnection();
    const [post, _] = await db.query(
      "insert into Post (postID, title, description, topicID, userID) values (?, ?, ?, ?, ?)",
      [postId, title, body, topicId, userId]
    );
    return res.status(200).json({
      message: "Added successfully",
      post,
    });
    db.release();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
