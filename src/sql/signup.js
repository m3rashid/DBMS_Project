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
  let avatarConfig;
  if (gender === "male") {
    avatarConfig = manAvatarDefault;
  } else {
    avatarConfig = womanAvatarDefault;
  }

  pool.getConnection((error, connection) => {
    if (error) throw new Error(error);

    connection.beginTransaction((err) => {
      if (err) throw new Error("Error in transaction");

      connection.query(
        `insert into Avatar (avatarID, sex, faceColor, earSize, hairColor, hairStyle, hatColor, hatStyle, glassesStyle, noseStyle, mouthStyle, shirtStyle, shirtColor, bgColor, isGradient) values (
          '${avatarId}', 
          '${avatarConfig.sex}', 
          '${avatarConfig.faceColor}', 
          '${avatarConfig.earSize}', 
          '${avatarConfig.hairColor}', 
          '${avatarConfig.hairStyle}', 
          '${avatarConfig.hatColor}', 
          '${avatarConfig.hatStyle}', 
          '${avatarConfig.glassesStyle}', 
          '${avatarConfig.noseStyle}', 
          '${avatarConfig.mouthStyle}', 
          '${avatarConfig.shirtStyle}', 
          '${avatarConfig.shirtColor}', 
          '${avatarConfig.bgColor}', 
          ${avatarConfig.isGradient}
        )`,
        (err, results, fields) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }
          connection.query(
            `insert into User (userID, userName, firstName, lastName, email, gender, avatarID, password) values(
              '${userId}', 
              '${username}', 
              '${firstName}', 
              '${lastName}', 
              '${email}', 
              '${gender}', 
              '${avatarId}', 
              '${hashedPassword}'
            )`,
            (err, results, fields) => {
              if (err) {
                return connection.rollback(() => {
                  throw err;
                });
              }
            },

            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  throw err;
                });
              }
              connection.release();
              return;
            })
          );
        }
      );
    });
  });
};

module.exports = signup;
