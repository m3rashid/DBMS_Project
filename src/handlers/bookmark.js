const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const removeBookmark = async (req, res) => {
  const { postID, userID } = req.body;
  const db = await pool.getConnection();
  await db.query("delete from Bookmark where userID = ? AND postID = ?", [
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
  let [bookmarks, __] = await db.query(
    "select  *,true as isBookmarked from Bookmark inner join Post on Bookmark.postID = Post.postID inner join User on Post.userID = User.userID inner join Avatar on User.avatarID = Avatar.avatarID inner join Topic on Post.topicID = Topic.topicID inner join Classification C on Post.postID = C.postID where Bookmark.userID = ? order by Post.updatedAt DESC",
    [userID]
  );
  const [likes, ___] = await db.query(
    "select postID from likes where userID = ?",
    [userID]
  );
  db.release();

  bookmarks = bookmarks.reduce((acc, curr) => {
    const hasLike = likes.find((like) => curr.postID === like.postID);
    return [
      ...acc,
      {
        ...curr,
        isLiked: hasLike ? true : false,
      },
    ];
  }, []);

  return res.status(200).json({ bookmarks });
};

module.exports = {
  removeBookmark,
  addBookmark,
  getAllBookmarks,
};
