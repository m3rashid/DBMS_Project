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
  db.release();

  return res.status(200).json({ likeID: likeID });
};

const removeLike = async (req, res) => {
  const { postID, userID } = req.body;
  const db = await pool.getConnection();
  // await db.query("select * from Bookmark where bookmarkID = ?", [bookmarkId]);
  await db.query("delete from `Like` where userID = ? AND postID = ?", [
    userID,
    postID,
  ]);
  db.release();
  return res.status(200).json({ message: "Like removed" });
};

module.exports = {
  addLike,
  removeLike,
};
