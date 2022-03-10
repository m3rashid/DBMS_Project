const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const { issueJWT } = require("../utils/jwt");
const { validateLogin, validateSignup } = require("../middlewares/auth");
const { hashPassword, comparePassword } = require("../utils/auth");
const pool = require("../utils/database");
const signup = require("../sql/signup");
const login = require("../sql/login");

router.post("/signup", validateSignup, async (req, res) => {
  const { firstName, lastName, username, email, gender, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const avatarId = uuidv4();
    const userId = uuidv4();
    const { user, avatar } = await signup(
      userId,
      username,
      firstName,
      lastName,
      email,
      gender,
      avatarId,
      hashedPassword
    );
    const { token, expires } = issueJWT(user);
    return res.status(200).json({
      token,
      expires,
      user: user,
      avatar: avatar,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const { username, password } = req.body;
  try {
    const { user, avatar } = await login(username, password);
    const { token, expires } = issueJWT(user);
    return res.status(200).json({
      token,
      expires,
      user,
      avatar,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
