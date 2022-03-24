const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const { issueJWT } = require("../utils/jwt");
const {
  validateLogin,
  validateSignup,
  validateAdminLogin,
} = require("../middlewares/auth");
const { hashPassword, comparePassword } = require("../utils/auth");
const pool = require("../utils/database");
const { checkAuth } = require("../middlewares/jwt.auth");
const { manAvatarDefault, womanAvatarDefault } = require("../handlers/helpers");

router.get("/", checkAuth, async (req, res) => {
  const { userId } = req;
  try {
    if (!userId) throw new Error("User not found");

    const db = await pool.getConnection();
    const [users, _] = await db.query("select * from User where userID = ?", [
      userId,
    ]);
    if (users.length === 0) throw new Error("User not found");

    const [avatars, __] = await db.query(
      "select * from Avatar where avatarID = ?",
      [users[0].avatarID]
    );
    db.release();

    return res.status(200).json({
      user: users[0],
      avatar: avatars[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/signup", validateSignup, async (req, res) => {
  const { firstName, lastName, username, email, gender, password } = req.body;
  const avatarId = uuidv4();
  const userId = uuidv4();
  try {
    const hashedPassword = await hashPassword(password);
    const avatarConfig =
      gender === "male" ? manAvatarDefault : womanAvatarDefault;

    const db = await pool.getConnection();
    await db.query("START TRANSACTION");
    const [_, __] = await db.query(
      "insert into Avatar (avatarID, sex, faceColor, earSize, hairColor, hairStyle, hatColor, hatStyle, glassesStyle, noseStyle, mouthStyle, shirtStyle, shirtColor, bgColor, isGradient) values (?)",
      [
        avatarId,
        avatarConfig.sex,
        avatarConfig.faceColor,
        avatarConfig.earSize,
        avatarConfig.hairColor,
        avatarConfig.hairStyle,
        avatarConfig.hatColor,
        avatarConfig.hatStyle,
        avatarConfig.glassesStyle,
        avatarConfig.noseStyle,
        avatarConfig.mouthStyle,
        avatarConfig.shirtStyle,
        avatarConfig.shirtColor,
        avatarConfig.bgColor,
        avatarConfig.isGradient,
      ]
    );
    const [___, ____] = await db.query(
      "insert into User (userID, userName, firstName, lastName, email, gender, avatarID, password) values (?)",
      [
        userId,
        username,
        firstName,
        lastName,
        email,
        gender,
        avatarId,
        hashedPassword,
      ]
    );
    await db.query("COMMIT");
    db.release();

    return res.status(200).json({
      message: "User created successfullly",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const { username, password, isAdmin } = req.body;
  try {
    if (isAdmin) throw new Error("Not an admin");

    const db = await pool.getConnection();
    const [users, _] = await db.query("select * from User where username = ?", [
      username,
    ]);
    if (users.length === 0) throw new Error("User not found");

    const isValid = await comparePassword(password, users[0].password);
    if (!isValid) throw new Error("Invalid Password");

    const [avatars, __] = await db.query(
      "select * from Avatar where avatarID = ?",
      [users[0].avatarID]
    );
    db.release();

    const { token, expires } = issueJWT(users[0]);
    return res.status(200).json({
      user: users[0],
      avatar: avatars[0],
      token,
      expires,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/adminLogin", validateAdminLogin, async (req, res) => {
  const { username, password, isAdmin } = req.body;
  try {
    if (!isAdmin) throw new Error("Not an admin");

    const db = await pool.getConnection();
    const [admins, _] = await db.query(
      "select * from Admin where username = ?",
      [username]
    );
    if (admins.length === 0) throw new Error("Invalid Credentials");
    else if (admins[0].password !== password)
      throw new Error("Invalid Credentials");

    const [users, __] = await db.query("select * from User");
    const [topics, ___] = await db.query("select * from Topic");
    const [posts, ____] = await db.query("select * from Post");
    db.release();

    const { token, expires } = issueJWT(admins[0]);
    return res.status(200).json({
      user: admins[0],
      users,
      posts,
      topics,
      token,
      expires,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
