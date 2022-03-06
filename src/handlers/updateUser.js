const express = require("express");
const router = express.Router();

const pool = require("../utils/database");
const checkAuth = require("../middlewares/jwt.auth");
const { hashPassword } = require("../utils/auth");

router.post("/avatar", checkAuth, async (req, res) => {
  const { avatar } = req.body;
  try {
    const newAvatar = await pool.query(
      "update jmiconnect.avatar set sex = $sex, faceColor = $faceColor, earSize = $earSize, hairColor = $hairColor, hairStyle = $hairStyle, hatColor = $hatColor, hatStyle = $hatStyle, glassesStyle = $glassesStyle, noseStyle = $noseStyle, mouthStyle = $mouthStyle, shirtStyle = $shirtStyle, shirtColor = $shirtColor, bgColor = $bgColor, isGradient = $isGradient WHERE avatarID = $avatarID RETURNING *",
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
        avatar.avatarId,
      ]
    );

    return res.status(200).json({
      message: "Avatar updated",
      avatar: newAvatar.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/profile", checkAuth, async (req, res) => {
  const { user } = req.body;
  try {
    const newUser = await pool.query(
      "update jmiconnect.user set userName = $userName, firstName = $firstName,  = $lastName, email = $email, gender = $gender, where userID = $userID RETURNING *",
      [
        user.username,
        user.firstName,
        user.lastName,
        user.email,
        user.gender,
        user.userId,
      ]
    );
    return res.status(200).json({
      message: "Profile updated Successfully",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/password", checkAuth, async (req, res) => {
  const userId = req.user;
  const { password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await pool.query(
      "update jmiconnect.user set password = $password WHERE userID = $userID RETURNING *",
      [hashedPassword, userId]
    );

    return res.status(200).json({
      message: "Password changed successfully",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
