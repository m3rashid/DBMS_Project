const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const removeBookmark = async (req, res) => {
  const { bookmarkId } = req.body;
  const db = await pool.getConnection();
  // await db.query("select * from Bookmark where bookmarkID = ?", [bookmarkId]);
  await db.query("delete from Bookmark where bookmarkID = ?", [bookmarkId]);
  db.release();
  return res.status(200).json({ message: "Bookmark removed" });
};

const addBookmark = async (req, res) => {
  const bookmarkId = uuidv4();
  const userId = req.userId;
  const postId = req.body.postId;

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

  return res.status(200).json({ bookmarkId: bookmarkId });
};

const getAllBookmarks = async (req, res) => {
  const { userID } = req.body;
  if (!userID) throw new Error("No user ID");

  const db = await pool.getConnection();
  const [bookmarks, __] = await db.query(
    "select  *,true as isBookmarked from bookmark inner join Post on bookmark.postID = Post.postID inner join User on Post.userID = User.userID inner join Avatar on User.avatarID = Avatar.avatarID inner join Topic on Post.topicID = Topic.topicID inner join Classification C on Post.postID = C.postID where bookmark.userID = ? order by post.updatedAt DESC",
    [userID]
  );
  db.release();
  return res.status(200).json({ bookmarks });
};

module.exports = {
  removeBookmark,
  addBookmark,
  getAllBookmarks,
};
