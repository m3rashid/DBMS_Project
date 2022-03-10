const pool = require("../utils/database");
const { manAvatarDefault, womanAvatarDefault } = require("../handlers/helpers");

const signup = async (
  userId,
  username,
  firstName,
  lastName,
  email,
  gender,
  avatarId,
  hashedPassword
) => {
  const client = pool.connect();
  await client.query("BEGIN");
  try {
    let avatarConfig;
    if (gender === "woman") {
      avatarConfig = womanAvatarDefault;
    } else {
      avatarConfig = manAvatarDefault;
    }

    const newAvatar = await client.query(
      "insert into Avatar (avatarID, sex, faceColor, earSize, hairColor, hairStyle, hatColor, hatStyle, glassesStyle, noseStyle, mouthStyle, shirtStyle, shirtColor, bgColor, isGradient) values ($avatarID, $sex, $faceColor, $earSize $hairColor, $hairStyle, $hatColor, $hatStyle, $glassesStyle, $noseStyle, $mouthStyle, $shirtStyle, $shirtColor, $bgColor, $isGradient) RETURNING *",
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
      "insert into User (userID, userName, firstName, lastName, email, gender, avatarID, password) values($userID, $userName, $firstName, $lastName, $email, $gender, $avatarID, $password) RETURNING *",
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
    return {
      user: newUser.rows[0],
      avatar: newAvatar.rows[0],
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw new Error("Error in database query", err);
  }
};

module.exports = signup;
