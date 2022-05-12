const pool = require("../utils/database");
const { hashPassword, comparePassword } = require("../utils/auth");

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const { userId } = req;
  if (!userId) throw new Error("User not found");

  const db = await pool.getConnection();
  const [users, _] = await db.query(
    "select * from User where userID = ? and avatarID = ?",
    [userId, avatar.avatarID]
  );
  if (users.length === 0) throw new Error("User not matched");
  await db.query(
    "update Avatar set sex = ?, faceColor = ?, earSize = ?, hairColor = ?, hairStyle = ?, hatColor = ?, hatStyle = ?, glassesStyle = ?, noseStyle = ?, mouthStyle = ?, shirtStyle = ?, shirtColor = ?, bgColor = ?, isGradient = ? where avatarID = ?",
    [
      avatar.sex,
      avatar.faceColor,
      avatar.earSize,
      avatar.hairColor,
      avatar.hairStyle,
      avatar.hatColor,
      avatar.hatStyle,
      avatar.glassesStyle,
      avatar.noseStyle,
      avatar.mouthStyle,
      avatar.shirtStyle,
      avatar.shirtColor,
      avatar.bgColor,
      avatar.isGradient,
      avatar.avatarID,
    ]
  );
  db.release();
  return res.status(200).json({ message: "Avatar updated successfully" });
};

const updatePassword = async (req, res) => {
  const { userId } = req;
  const { newPassword, oldPassword } = req.body;
  if (!userId) throw new Error("User not found");
  if (!newPassword || !oldPassword) throw new Error("Invalid credentials");

  const db = await pool.getConnection();
  const [users, _] = await db.query("select * from User where userID = ?", [
    userId,
  ]);
  if (users.length === 0) throw new Error("User not found");

  const isValid = await comparePassword(oldPassword, users[0].password);
  if (!isValid) throw new Error("Invalid Password");

  const hashedPassword = await hashPassword(newPassword);
  await db.query("update User set password = ? where userID = ?", [
    hashedPassword,
    userId,
  ]);
  db.release();
  return res.status(200).json({ message: "Password updated successfully" });
};

const updateProfile = async (req, res) => {
  const { userId } = req;
  const { profile } = req.body;
  if (!userId) throw new Error("User not found");

  const db = await pool.getConnection();
  await db.query(
    "update User set firstName = ?, lastName = ?, email = ?, gender = ?, phNumber = ?, dob = ? where userID = ?",
    [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.gender,
      profile.phNumber,
      profile.dob,
      userId,
    ]
  );
  db.release();

  return res.status(200).json({ message: "Profile updated successfullly" });
};

module.exports = {
  updateAvatar,
  updatePassword,
  updateProfile,
};
