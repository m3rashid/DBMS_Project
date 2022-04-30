const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const removeBookmark = async (req, res) => {
  const { postID, userID } = req.body;
  const db = await pool.getConnection();
  // await db.query("select * from Bookmark where bookmarkID = ?", [bookmarkId]);
  await db.query("delete from bookmark where userID = ? AND postID = ?", [
    userID,
    postID,
  ]);
  db.release();
  return res.status(200).json({ message: "Bookmark removed" });
};

const addBookmark = async (req, res) => {
  const bookmarkId = uuidv4();
  const { postID, userID } = req.body;

  const db = await pool.getConnection();

  await db.query(
    "INSERT INTO Bookmark (bookmarkID,userID,postID) VALUES (?, ?, ?)",
    [bookmarkId, userID, postID]
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
