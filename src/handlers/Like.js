const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const addLike = async (req, res) => {
  const likeID = uuidv4();
  const { postID, userID } = req.body;

  const db = await pool.getConnection();

  await db.query("INSERT INTO `Like` (likeID,userID,postID) VALUES (?, ?, ?)", [
    likeID,
    userID,
    postID,
  ]);

  await db.query(
    "update post set likes = (select count(*) from `Like` where `Like`.postID = ? ) where post.postID = ?;",
    [postID, postID]
  );

  db.release();

  return res.status(200).json({ likeID: likeID });
};

const removeLike = async (req, res) => {
  const { postID, userID } = req.body;
  const db = await pool.getConnection();
  await db.query("delete from `Like` where userID = ? AND postID = ?", [
    userID,
    postID,
  ]);

  await db.query(
    "update post set likes = (select count(*) from `Like` where `Like`.postID = ? ) where post.postID = ?;",
    [postID, postID]
  );

  db.release();
  return res.status(200).json({ message: "Like removed" });
};

module.exports = {
  addLike,
  removeLike,
};
