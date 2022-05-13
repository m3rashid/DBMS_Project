const express = require("express");
const router = express.Router();

const {
  createTopic,
  deletePost,
  deleteTopic,
  deleteUser,
  getOneUser,
  getTopics,
  getUsers,
  updateTopic,
} = require("./handlers/admin");
const {
  adminLogin,
  getAdmin,
  getUser,
  login,
  signup,
  getOneOtherUser,
} = require("./handlers/auth");
const {
  addBookmark,
  removeBookmark,
  getAllBookmarks,
} = require("./handlers/bookmark");
const { getAllChats } = require("./handlers/chat");
const {
  addComments,
  editComment,
  deleteComment,
} = require("./handlers/comments");
const {
  sendRequest,
  unSendRequest,
  acceptRequest,
  denyRequest,
  unFriend,
  blockUser,
  unblockUser,
} = require("./handlers/friends");
const { addLike, removeLike } = require("./handlers/likes");
const {
  addPost,
  getAllPosts,
  getOnePost,
  getPostsByTopic,
} = require("./handlers/post");
const { searchUserAndTopic } = require("./handlers/search");
const {
  updateAvatar,
  updatePassword,
  updateProfile,
} = require("./handlers/updateUser");
const {
  validateAdminLogin,
  validateLogin,
  validateSignup,
} = require("./middlewares/auth");
const { checkAdmin, checkAuth } = require("./middlewares/jwt.auth");
// const { regularRateLimiter, authRateLimiter } = require("./utils/rateLimit");

const use = (check) => (req, res, next) => {
  Promise.resolve(check(req, res, next)).catch(next);
};

// health check
router.post("/", (req, res) => res.sendStatus(200));

// admin actions
router.post("/admin/createTopic", checkAuth, use(checkAdmin), use(createTopic));
router.post("/admin/updateTopic", checkAuth, use(checkAdmin), use(updateTopic));
router.post("/admin/deleteTopic", checkAuth, use(checkAdmin), use(deleteTopic));
router.post("/admin/deletePost", checkAuth, use(checkAdmin), use(deletePost));
router.post("/admin/deleteUser", checkAuth, use(checkAdmin), use(deleteUser));
router.post("/admin/getUser", checkAuth, use(checkAdmin), use(getOneUser));
router.post("/admin/getUsers", checkAuth, use(checkAdmin), use(getUsers));
router.get("/admin/topics", checkAuth, use(getTopics));

// auth actions
router.get("/auth/admin", checkAuth, use(checkAdmin), use(getAdmin));
router.post("/auth/adminLogin", use(validateAdminLogin), use(adminLogin));
router.post("/auth/signup", use(validateSignup), use(signup));
router.post("/auth/login", use(validateLogin), use(login));
router.get("/auth/", checkAuth, use(getUser));
router.post("/auth/other-user", checkAuth, use(getOneOtherUser));

// user actions
router.post("/user/update-avatar", checkAuth, use(updateAvatar));
router.post("/user/update-profile", checkAuth, use(updateProfile));
router.post("/user/update-password", checkAuth, use(updatePassword));

// Post actions
router.post("/post/fromTopic", checkAuth, use(getPostsByTopic));
router.post("/post/all", checkAuth, use(getAllPosts));
router.post("/post/one", checkAuth, use(getOnePost));
router.post("/post/add", checkAuth, use(addPost));

// Like actions
router.post("/like/add", checkAuth, use(addLike));
router.post("/like/remove", checkAuth, use(removeLike));

// comment actions
router.post("/comments/addComments", checkAuth, use(addComments));
router.post("/comments/edit", checkAuth, use(editComment));
router.post("/comments/delete", checkAuth, use(deleteComment));

//friendship actions
router.post("/friendship/send", checkAuth, use(sendRequest));
router.post("/friendship/unsend", checkAuth, use(unSendRequest));
router.post("/friendship/accept", checkAuth, use(acceptRequest));
router.post("/friendship/deny", checkAuth, use(denyRequest));
router.post("/friendship/unfriend", checkAuth, use(unFriend));
router.post("/friendship/block", checkAuth, use(blockUser));
router.post("/friendship/unblock", checkAuth, use(unblockUser));

// bookmark actions
router.post("/bookmark/remove", checkAuth, use(removeBookmark));
router.post("/bookmark/add", checkAuth, use(addBookmark));
router.post("/bookmark/all", checkAuth, use(getAllBookmarks));

// chat actions
router.post("/chats/all", checkAuth, use(getAllChats));

// search actions
router.post("/search", use(searchUserAndTopic));

module.exports = router;
