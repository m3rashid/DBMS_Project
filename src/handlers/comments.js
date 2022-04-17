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
      if (!postId)
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

//deleteing comments

//do we have to give access to admin to delete the comments?? 

router.post("/delete", checkAuth, async (req, res) => {
    const { postID , commentID, userID } = req.body;
   
    try {
      if (!postID && !commentID && !userID) throw new Error("Post and Comment not found ");
  
      const db = await pool.getConnection();
  

      //deleting comment
      const [, _] = await db.query("delete from Comments where  commentID = ?, userID = ?", 
      [
        commentID, userID
      ]);
      db.release();
  
      return res.status(200).json({
        message: "Comment Deleted successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    }
  });
 //del leftttttt
  ////////////

  router.post("/edit", checkAuth, async (req, res) => {
    const { commentID,text, userID } = req.body;
   
    try {
      if (!commentID && !userID) throw new Error("NO comment found ");
  
      const db = await pool.getConnection();
  
      //updating topic
      const [, _] = await db.query("update Comments set text = ?, updatedAt = CURRENT_TIMESTAMP(3) where CommentID = ?", [
        text,commentID,
      ]);
      db.release();
  
      return res.status(200).json({
        message: "Comment Editted successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    }
  });

module.exports = router;
