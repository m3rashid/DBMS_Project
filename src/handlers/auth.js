const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const { issueJWT } = require("../utils/jwt");
const { validateLogin, validateSignup } = require("../middlewares/auth");
const { hashPassword, comparePassword } = require("../utils/auth");
const { manAvatarDefault, womanAvatarDefault } = require("./helpers");
const pool = require("../utils/database");

router.post("/signup", validateSignup, async (req, res) => {
  const { firstName, lastName, username, email, gender, password } = req.body;
  let avatarConfig;
  if (gender === "woman") {
    avatarConfig = womanAvatarDefault;
  } else {
    avatarConfig = manAvatarDefault;
  }

  const client = pool.connect();
  try {
    const hashedPassword = await hashPassword(password);
    const avatarId = uuidv4();
    const userId = uuidv4();

    await client.query("BEGIN");
    const newAvatar = await client.query(
      "insert into jmiconnect.avatar (avatarID, sex, faceColor, earSize, hairColor, hairStyle, hatColor, hatStyle, glassesStyle, noseStyle, mouthStyle, shirtStyle, shirtColor, bgColor, isGradient) values ($avatarID, $sex, $faceColor, $earSize $hairColor, $hairStyle, $hatColor, $hatStyle, $glassesStyle, $noseStyle, $mouthStyle, $shirtStyle, $shirtColor, $bgColor, $isGradient) RETURNING *",
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
    const newUser = await client.query(
      "insert into jmiconnect.user (userID, userName, firstName, lastName, email, gender, avatarID, password) values($userID, $userName, $firstName, $lastName, $email, $gender, $avatarID, $password) RETURNING *",
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
    await client.query("COMMIT");
    client.release();

    const avatar = newAvatar.rows[0];
    const user = newUser.rows[0];
    const { token, expires } = issueJWT(user);

    return res.status(200).json({
      token,
      expires,
      user: user,
      avatar: avatar,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query(
      "select * from jmiconnect.user where jmiconnect.user.userName = $username",
      [username]
    );

    const foundUser = user.rows[0];
    if (!foundUser) return res.sendStatus(400);

    const matched = await comparePassword(password, foundUser.password);
    if (!matched) return res.sendStatus(401);

    const avatar = await pool.query(
      "select * from jmiconnect.avatar where jmiconnect.avatar.avatarID = $avatarID",
      [foundUser.avatarID]
    );
    const foundAvatar = avatar.rows[0];

    const { token, expires } = issueJWT(user);
    return res.status(200).json({
      token,
      expires,
      user: foundUser,
      avatar: foundAvatar,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
