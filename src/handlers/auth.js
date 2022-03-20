const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const { issueJWT } = require("../utils/jwt");
const { validateLogin, validateSignup } = require("../middlewares/auth");
const { hashPassword, comparePassword } = require("../utils/auth");
const signup = require("../sql/signup");
const pool = require("../utils/database");
const checkAuth = require("../middlewares/jwt.auth");

router.get("/", checkAuth, async (req, res) => {
  const { userId } = req;
  try {
    pool.getConnection((error, connection) => {
      if (error) throw new Error(error);
      connection.query(
        `select * from User where userID = '${userId}'`,
        async (err, result) => {
          if (err) throw new Error(err);

          const user = result[0];
          if (!user) throw new Error("User not found");

          connection.query(
            `select * from Avatar where avatarID = '${user.avatarID}'`,
            (err2, result2) => {
              if (err2) throw new Error(err2);

              const avatar = result2[0];
              connection.release();
              return res.status(200).json({
                user,
                avatar,
              });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/signup", validateSignup, async (req, res) => {
  const { firstName, lastName, username, email, gender, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const avatarId = uuidv4();
    const userId = uuidv4();
    signup(
      userId,
      username,
      firstName,
      lastName,
      email,
      gender,
      avatarId,
      hashedPassword
    );
    return res.status(200).json({
      message: "User created successfullly",
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const { username, password } = req.body;
  try {
    pool.getConnection((error, connection) => {
      if (error) throw new Error(error);
      connection.query(
        `select * from User where username = '${username}'`,
        async (err, result) => {
          if (err) throw new Error(err);

          const user = result[0];
          if (!user) throw new Error("User not found");

          const isValid = await comparePassword(password, user.password);
          if (!isValid) throw new Error("Invalid Credentials");

          connection.query(
            `select * from Avatar where avatarID = '${user.avatarID}'`,
            (err2, result2) => {
              if (err2) throw new Error(err2);

              const avatar = result2[0];
              connection.release();
              const { token, expires } = issueJWT(user);
              return res.status(200).json({
                token,
                expires,
                user,
                avatar,
              });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
