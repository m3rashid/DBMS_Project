const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const { checkAuth, checkAdmin } = require("../middlewares/jwt.auth");
const pool = require("../utils/database");

router.post("/getUsers", checkAuth, checkAdmin, (req, res) => {
  try {
    pool.getConnection((error, connection) => {
      if (error) throw new Error(error);
      connection.query(`select * from User`, (err, result) => {
        if (err || result.length == 0) throw new Error(err);
        connection.release();
        return res.status(200).json({
          users: result,
        });
      });
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/getUser", checkAuth, checkAdmin, (req, res) => {
  const { userID } = req.body;
  try {
    pool.getConnection((error, connection) => {
      if (error) throw new Error(error);
      connection.query(
        `select * from User where userID = '${userID}'`,
        (err, result) => {
          if (err || result.length == 0) throw new Error(err);
          connection.release();
          return res.status(200).json({
            user: result[0],
          });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/deleteUser", checkAuth, checkAdmin, (req, res) => {
  const { userID } = req.body;
  try {
    pool.getConnection((error, connection) => {
      if (error) throw new Error(error);
      connection.query(
        `delete from User where userID = '${userID}'`,
        (err, result) => {
          if (err) throw new Error(err);
          connection.release();
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/topics", checkAuth, (req, res) => {
  try {
    pool.getConnection((error, connection) => {
      if (error) throw new Error(error);
      connection.query(`select * from Topic`, (err, result) => {
        if (err || result.length == 0) throw new Error(err);
        connection.release();
        return res.status(200).json({
          topics: result,
        });
      });
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/createTopic", checkAuth, checkAdmin, (req, res) => {
  const { topicName } = req.body;
  const topicId = uuidv4();
  try {
    pool.getConnection((error, connection) => {
      if (error) throw new Error(error);
      connection.query(
        `insert into Topic (topicID, name) values ('${topicId}', '${topicName}')`,
        (err, result) => {
          if (err) throw new Error(err);
          connection.release();
          res.status(200).json({
            message: "Topic created successfully              ",
          });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
