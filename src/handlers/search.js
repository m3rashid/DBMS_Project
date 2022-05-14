const pool = require("../utils/database");

const searchUserAndTopic = async (req, res) => {
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
  db.release();
  return res.status(200).json({ topics, users });
};

module.exports = { searchUserAndTopic };
