const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const pool = require("../utils/database");
const { checkAuth } = require("../middlewares/jwt.auth");

// add your routes here
router.post("/remove", checkAuth, async (req, res) => {
  const { bookmarkId } = req.body;
  try {
    const db = await pool.getConnection();
    const [bookmark, _] = await db.query(
      "select * from Bookmark where bookmarkID = ?",
      [bookmarkId]
    );
    await db.query("delete from Bookmark where bookmarkID=?", [bookmarkId]);
    db.release();
    return res.status(200).json({
      message: "Bookmark removed",
    });
  } catch (e) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});
//

router.post("/add", checkAuth, async (req, res) => {
  const bookmarkId = uuidv4();
  const userId = req.userId;
  const postId = req.body.postId;

  try {
    const db = await pool.getConnection();
    const [users, _] = await db.query("select * from User where userID = ?", [
      userId,
    ]);
    if (users.length === 0) throw new Error("user not found");

    const [post, __] = await db.query("select * from Post where postID = ?", [
      postId,
    ]);
    if (post.length === 0) throw new Error("Post not found");

    await db.query(
      "INSERT INTO Bookmark (bookmarkID,userID,postID) VALUES (?, ?, ?)",
      [bookmarkId, userId, postId]
    );
    db.release();

    return res.status(200).json({
      bookmarkId: bookmarkId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: err.message,
    });
  }
});

//

module.exports = router;
