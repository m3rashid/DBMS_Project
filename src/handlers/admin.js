const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const { checkAuth, checkAdmin } = require("../middlewares/jwt.auth");
const pool = require("../utils/database");

router.post("/getUsers", checkAuth, checkAdmin, (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) return res.sendStatus(500);
    try {
      connection.query(`select * from User`, (err, result) => {
        if (err || result.length == 0) throw new Error(err);
        connection.release();
        return res.status(200).json({
          users: result,
        });
      });
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

router.post("/getUser", checkAuth, checkAdmin, (req, res) => {
  const { userID } = req.body;
  pool.getConnection((error, connection) => {
    if (error) return res.sendStatus(500);
    try {
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
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

router.post("/deleteUser", checkAuth, checkAdmin, (req, res) => {
  const { userID } = req.body;
  pool.getConnection((error, connection) => {
    if (error) return res.sendStatus(500);
    try {
      connection.query(
        `delete from User where userID = '${userID}'`,
        (err, result) => {
          if (err) throw new Error(err);
          connection.release();
        }
      );
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

router.get("/topics", checkAuth, (req, res) => {
  pool.getConnection((error, connection) => {
    try {
      if (error) throw new Error(error);
      connection.query(`select * from Topic`, (err, result) => {
        if (err || result.length == 0) throw new Error(err);
        connection.release();
        return res.status(200).json({
          topics: result,
        });
      });
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

router.post("/createTopic", checkAuth, checkAdmin, (req, res) => {
  const { topicName } = req.body;
  const topicId = uuidv4();
  pool.getConnection((error, connection) => {
    try {
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
    } catch (err) {
      console.log(err);
      connection.release();
      return res.sendStatus(500);
    }
  });
});

module.exports = router;
