const express = require("express");
const router = express.Router();

const pool = require("../utils/database");

router.post("/search", async (req, res) => {
  try {
    const { search } = req.body;
    const db = await pool.getConnection();
    const [topics, _] = await db.query(
      "select topicID, name from Topic where name like ?;",
      ["%" + search + "%"]
    );
    const [users, __] = await db.query(
      "select userID, userName from User where userName like ?;",
      ["%" + search + "%"]
    );
    return res.status(200).json({ topics, users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
