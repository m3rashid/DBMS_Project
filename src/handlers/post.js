const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const pool = require("../utils/database");
const { checkAuth } = require("../middlewares/jwt.auth");

router.get("/all", checkAuth, async (req, res) => {
  try {
    const db = await pool.getConnection();
    const [posts, _] = await db.query(
      "select * from Post inner join User on Post.userID = User.userID inner join Avatar on User.avatarID = Avatar.avatarID inner join Topic on Post.topicID = Topic.topicID inner join Classification C on Post.postID = C.postID order by Post.updatedAt DESC"
    );
    db.release();
    return res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
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
    const [classification, __] = await db.query(
      "select * from Classification where postID = ?",
      [postId]
    );
    db.release();
    return res.status(200).json({
      post: posts[0],
      classification: classification[0],
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
    return res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/add", checkAuth, async (req, res) => {
  const { title, body, topicId, userId, toxicity, toxicityAnalysis } = req.body;
  try {
    if (!title || !topicId || !userId) {
      throw new Error("No title, topicId or userId");
    }
    if (!toxicity || !toxicityAnalysis) {
      throw new Error("Mising data, try again");
    }

    const postId = uuidv4();
    const classificationId = uuidv4();

    const db = await pool.getConnection();
    await db.query("START TRANSACTION");
    await db.query(
      "insert into Post (postID, title, description, topicID, userID, postReputation) values (?, ?, ?, ?, ?, ?)",
      [postId, title, body, topicId, userId, toxicity]
    );
    await db.query(
      "insert into Classification (classificationID, identity_attack, insult, obscene, severe_toxicity, sexual_explicit, threat, toxicity, postID) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        classificationId,
        toxicityAnalysis.identity_attack,
        toxicityAnalysis.insult,
        toxicityAnalysis.obscene,
        toxicityAnalysis.severe_toxicity,
        toxicityAnalysis.sexual_explicit,
        toxicityAnalysis.threat,
        toxicityAnalysis.toxicity,
        postId,
      ]
    );
    await db.query("COMMIT");
    db.release();
    return res.status(200).json({
      message: "Added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/get-classifications", checkAuth, async (req, res) => {
  const { postId } = req.body;
  try {
    if (!postId) throw new Error("No post ID");

    const db = await pool.getConnection();
    const [classification, _] = await db.query(
      "select * from Classification where postID = ?",
      [postId]
    );
    db.release();
    return res.status(200).json({ classification });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
