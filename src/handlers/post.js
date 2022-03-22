const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const pool = require("../utils/database");
const { checkAuth } = require("../middlewares/jwt.auth");

router.get("/all", checkAuth, async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) return res.sendStatus(500);
    try {
      connection.query(
        `select * from Post
          inner join User on Post.userID = User.userID
          inner join Avatar on User.avatarID = Avatar.avatarID
          inner join Topic on Post.topicID = Topic.topicID order by Post.updatedAt DESC;`,
        (err, results) => {
          if (err) throw new Error(err);
          connection.release();
          return res.status(200).json({
            posts: results,
          });
        }
      );
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

router.post("/one", checkAuth, (req, res) => {
  const { postId } = req.body;
  if (!postId) return res.sendStatus(500);
  pool.getConnection((error, connection) => {
    if (error) return res.sendStatus(500);
    try {
      connection.query(
        `select * from Post
          inner join User on Post.userID = User.userID
          inner join Avatar on User.avatarID = Avatar.avatarID
          inner join Topic on Post.topicID = Topic.topicID where postID='${postId}';`,
        (err, results) => {
          if (err) throw new Error(err);
          connection.release();
          return res.status(200).json({
            post: results[0],
          });
        }
      );
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

router.post("/fromTopic", checkAuth, (req, res) => {
  const { topicId } = req.body;
  if (!topicId) return res.sendStatus(500);
  pool.getConnection((error, connection) => {
    if (error) return res.sendStatus(500);
    try {
      connection.query(
        `select * from Post
          inner join User on Post.userID = User.userID
          inner join Avatar on User.avatarID = Avatar.avatarID
          inner join Topic on Post.topicID = Topic.topicID
        where Post.topicID='${topicId}' order by Post.updatedAt DESC;`,
        (err, results) => {
          if (err) throw new Error(err);
          connection.release();
          return res.status(200).json({
            posts: results,
          });
        }
      );
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

router.post("/add", checkAuth, (req, res) => {
  const { title, body, topicId, userId } = req.body;
  const postId = uuidv4();
  if (!title || !topicId) return res.sendStatus(500);

  pool.getConnection((error, connection) => {
    try {
      if (error) throw new Error(error);
      connection.query(
        `insert into Post (postID, title, description, topicID, userID) values (
        '${postId}',
        '${title}',
        '${body}',
        '${topicId}',
        '${userId}'
      );`,
        (err, result, fields) => {
          if (err) throw new Error(err);
          connection.release();
          return res.status(200).json({
            result,
            fields,
            message: "Added successfully",
          });
        }
      );
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

module.exports = router;
