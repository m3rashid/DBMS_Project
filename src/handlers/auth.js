const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const { issueJWT } = require("../utils/jwt");
const { validateLogin, validateSignup } = require("../middlewares/auth");
const { hashPassword, comparePassword } = require("../utils/auth");
const { manAvatarDefault, womanAvatarDefault } = require("./helpers");
const app = require("../../index");

router.post("/signup", validateSignup, async (req, res) => {
  const { firstName, lastName, username, email, gender, password } = req.body;
  let avatatConfig;
  if (gender === "woman") {
    avatatConfig = womanAvatarDefault;
  } else {
    avatatConfig = manAvatarDefault;
  }

  try {
    const hashedPassword = await hashPassword(password);
    const avatarId = uuidv4();
    const userId = uuidv4();
    const database = app.locals.db;
    const query = app.locals.query;
    await database.connect();

    await query(`
      insert into jmi_connect.avatar (
        avatarID, 
        sex,
        faceColor,
        earSize, 
        hairColor,
        hairStyle,
        hatColor,
        hatStyle, 
        glassesStyle, 
        noseStyle, 
        mouthStyle, 
        shirtStyle,
        shirtColor, 
        bgColor,
        isGradient
      ) 
      values (
        '${avatarId}',
        '${avatatConfig.sex}',
        '${avatatConfig.faceColor}',
        '${avatatConfig.earSize}',
        '${avatatConfig.hairColor}',
        '${avatatConfig.hairStyle}',
        '${avatatConfig.hatColor}',
        '${avatatConfig.hatStyle}',
        '${avatatConfig.glassesStyle}',
        '${avatatConfig.noseStyle}',
        '${avatatConfig.mouthStyle}',
        '${avatatConfig.shirtStyle}',
        '${avatatConfig.shirtColor}',
        '${avatatConfig.bgColor}',
        '${avatatConfig.isGradient}'
      );
    `);
    await query(`
      insert into jmi_connect.user (
        userID,
        userName,
        firstName,
        lastName,
        email,
        gender,
        avatarID,
        password
      )
      values (
        '${userId}',
        '${username}',
        '${firstName}',
        '${lastName}',
        '${email}',
        '${gender}',
        '${avatarId}',
        '${hashedPassword}'
      );
    `);
    const user = await query(`
      select * from jmi_connect.user
      where userID = '${userId}';
    `);
    const avatar = await query(`
      select * from jmi_connect.avatar
      where avatarID = '${avatarId}';
    `);
    await database.end();
    const { token, expires } = issueJWT(user);

    res.status(200).json({
      token,
      expires,
      user: user[0],
      avatar: avatar[0],
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const database = app.locals.db;
    const query = app.locals.query;
    await database.connect();

    const user = await query(`
      select * from jmi_connect.user
        where jmi_connect.user.userName = '${username}';
    `);
    const matched = await comparePassword(password, user[0].password);
    if (!matched) {
      await database.end();
      res.sendStatus(401);
    }
    const avatar = await query(`
      select * from jmi_connect.avatar
        where jmi_connect.avatar.avatarID = '${user[0].avatarID}';
    `);
    await database.end();

    const { token, expires } = issueJWT(user);
    res.status(200).json({
      token,
      expires,
      user: user[0],
      avatar: avatar[0],
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
