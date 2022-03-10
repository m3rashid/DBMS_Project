const { comparePassword } = require("../utils/auth");
const pool = require("../utils/database");

const login = async (username, password) => {
  const client = pool.connect();
  const user = await pool.query(
    "select * from jmiconnect.user where jmiconnect.user.userName = $username",
    [username]
  );
  const foundUser = user.rows[0];
  if (!foundUser) {
    throw new Error("User not found");
  }

  const matched = await comparePassword(password, foundUser.password);
  if (!matched) {
    throw new Error("Wrong credentials");
  }

  const avatar = await pool.query(
    "select * from jmiconnect.avatar where jmiconnect.avatar.avatarID = $avatarID",
    [foundUser.avatarID]
  );
  const foundAvatar = avatar.rows[0];

  return { user: foundUser, avatar: foundAvatar };
};

module.exports = login;
