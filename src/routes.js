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
const { getNotifications } = require("./handlers/notifs");
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
const { regularRateLimiter, authRateLimiter } = require("./utils/rateLimit");

const use = (check) => (req, res, next) => {
  Promise.resolve(check(req, res, next)).catch(next);
};

// health check
router.post("/", (req, res) => res.sendStatus(200));

// admin actions
router.post(
  "/admin/createTopic",
  regularRateLimiter,
  checkAuth,
  use(checkAdmin),
  use(createTopic)
);
router.post(
  "/admin/updateTopic",
  regularRateLimiter,
  checkAuth,
  use(checkAdmin),
  use(updateTopic)
);
router.post(
  "/admin/deleteTopic",
  regularRateLimiter,
  checkAuth,
  use(checkAdmin),
  use(deleteTopic)
);
router.post(
  "/admin/deletePost",
  regularRateLimiter,
  checkAuth,
  use(checkAdmin),
  use(deletePost)
);
router.post(
  "/admin/deleteUser",
  regularRateLimiter,
  checkAuth,
  use(checkAdmin),
  use(deleteUser)
);
router.post(
  "/admin/getUser",
  regularRateLimiter,
  checkAuth,
  use(checkAdmin),
  use(getOneUser)
);
router.post(
  "/admin/getUsers",
  regularRateLimiter,
  checkAuth,
  use(checkAdmin),
  use(getUsers)
);
router.get("/admin/topics", regularRateLimiter, use(getTopics));

// auth actions
router.get(
  "/auth/admin",
  regularRateLimiter,
  checkAuth,
  use(checkAdmin),
  use(getAdmin)
);
router.post(
  "/auth/adminLogin",
  authRateLimiter,
  use(validateAdminLogin),
  use(adminLogin)
);
router.post("/auth/signup", authRateLimiter, use(validateSignup), use(signup));
router.post("/auth/login", authRateLimiter, use(validateLogin), use(login));
router.get("/auth/", checkAuth, authRateLimiter, use(getUser));
router.post(
  "/auth/other-user",
  regularRateLimiter,
  checkAuth,
  use(getOneOtherUser)
);

// user actions
router.post(
  "/user/update-avatar",
  authRateLimiter,
  checkAuth,
  use(updateAvatar)
);
router.post(
  "/user/update-profile",
  authRateLimiter,
  checkAuth,
  use(updateProfile)
);
router.post(
  "/user/update-password",
  authRateLimiter,
  checkAuth,
  use(updatePassword)
);

// Post actions
router.post(
  "/post/fromTopic",
  regularRateLimiter,
  checkAuth,
  use(getPostsByTopic)
);
router.post("/post/all", regularRateLimiter, checkAuth, use(getAllPosts));
router.post("/post/one", regularRateLimiter, checkAuth, use(getOnePost));
router.post("/post/add", regularRateLimiter, checkAuth, use(addPost));

// Like actions
router.post("/like/add", regularRateLimiter, checkAuth, use(addLike));
router.post("/like/remove", regularRateLimiter, checkAuth, use(removeLike));

// comment actions
router.post(
  "/comments/addComments",
  regularRateLimiter,
  checkAuth,
  use(addComments)
);
router.post("/comments/edit", regularRateLimiter, checkAuth, use(editComment));
router.post(
  "/comments/delete",
  regularRateLimiter,
  checkAuth,
  use(deleteComment)
);

//friendship actions
router.post(
  "/friendship/send",
  regularRateLimiter,
  checkAuth,
  use(sendRequest)
);
router.post(
  "/friendship/unsend",
  regularRateLimiter,
  checkAuth,
  use(unSendRequest)
);
router.post(
  "/friendship/accept",
  regularRateLimiter,
  checkAuth,
  use(acceptRequest)
);
router.post(
  "/friendship/deny",
  regularRateLimiter,
  checkAuth,
  use(denyRequest)
);
router.post(
  "/friendship/unfriend",
  regularRateLimiter,
  checkAuth,
  use(unFriend)
);
router.post("/friendship/block", regularRateLimiter, checkAuth, use(blockUser));
router.post(
  "/friendship/unblock",
  regularRateLimiter,
  checkAuth,
  use(unblockUser)
);

// bookmark actions
router.post(
  "/bookmark/remove",
  regularRateLimiter,
  checkAuth,
  use(removeBookmark)
);
router.post("/bookmark/add", regularRateLimiter, checkAuth, use(addBookmark));
router.post(
  "/bookmark/all",
  regularRateLimiter,
  checkAuth,
  use(getAllBookmarks)
);

// chat actions
router.post("/chats/all", regularRateLimiter, checkAuth, use(getAllChats));

// search actions
router.post("/search", use(searchUserAndTopic));

// notification actions
router.post("/notifs", regularRateLimiter, checkAuth, use(getNotifications));

module.exports = router;
