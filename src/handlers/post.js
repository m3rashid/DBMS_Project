const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const pool = require("../utils/database");
const { checkAuth } = require("../middlewares/jwt.auth");

router.post("/add", checkAuth, (req, res) => {
  const {
    userId,
    body: { title, body, topicId },
  } = req;
  const postId = uuidv4();
  try {
    if (!title || !body || !topicId)
      throw new Error("title, body and topicId are required");

    pool.getConnection((error, connection) => {
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
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// router.post("/update", checkAuth, (req, res) => {});

// router.post("/delete", checkAuth, (req, res) => {});

// router.get("/all", checkAuth, (req, res) => {});

// router.get("/:postId", checkAuth, (req, res) => {});

module.exports = router;
