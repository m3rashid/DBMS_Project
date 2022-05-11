const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const addComments = async (req, res) => {
  const { postId, userId, text } = req.body;
  if (!postId) throw new Error("No postId or userId");

  const commentId = uuidv4();
  const db = await pool.getConnection();
  await db.query(
    "insert into Comments (commentId, text, userID, postID) values ( ?, ?, ?, ?)",
    [commentId, text, userId, postId]
  );
  await db.query(
    "update Post set commentsCount = commentsCount + 1 where postID = ?",
    [postId]
  );
  const [comments, ___] = await db.query(
    "select * from Comments inner join User on Comments.userID = User.userID inner join Avatar on User.avatarID = Avatar.avatarID where commentID = ?",
    [commentId]
  );
  db.release();
  return res
    .status(200)
    .json({ message: "Comment Added successfully", comment: comments[0] });
};

/**
 * @ayesha and @aiman working on this
 */
//compare the logged in user with the commented user
const deleteComment = async (req, res) => {
  const { postID, commentID, userID } = req.body;

  if (!postID && !commentID && !userID)
    throw new Error("Post and Comment not found ");

  const db = await pool.getConnection();
  const [, _] = await db.query(
    "delete from Comments where  commentID = ?, userID = ?",
    [commentID, userID]
  );
  db.release();

  return res.status(200).json({ message: "Comment Deleted successfully" });
};

const editComment = async (req, res) => {
  const { commentID, text, userID } = req.body;
  if (!commentID && !userID) throw new Error("NO comment found ");

  const db = await pool.getConnection();
  await db.query(
    "update Comments set text = ?, updatedAt = CURRENT_TIMESTAMP(3) where CommentID = ?",
    [text, commentID]
  );
  db.release();

  return res.status(200).json({ message: "Comment Editted successfully" });
};

module.exports = {
  addComments,
  editComment,
  deleteComment,
};
