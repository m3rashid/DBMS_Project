const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const pool = require("../utils/database");
const { checkAuth } = require("../middlewares/jwt.auth");

// add your routes here

//




//TRY AYESHA

router.post("/addComments", checkAuth, async (req, res) => {
    const {postId, userId, text} = req.body;
    try {
      if (!postId || !userId)
        throw new Error("No postId or userId");
  
      const commentId = uuidv4();
  
      const db = await pool.getConnection();
      const [comment, _] = await db.query(
        "insert into Comments (commentId, text, userID, postID) values ( ?, ?, ?, ?)",
        [commentId, text, userId, postId]
      );
      db.release();
      return res.status(200).json({
        message: "Comment Added successfully"
    });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    }
  });





//

module.exports = router;
