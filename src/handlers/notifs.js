const pool = require("../utils/database");

const getNotifications = async (req, res) => {
  const { userId } = req;
  if (!userId) throw new Error("User not found");

  const db = await pool.getConnection();
  const [notifs, _] = await db.query(
    "select * from friendship inner join user on user.userID = toID inner join avatar a on user.avatarID = a.avatarID where status <> 'STRANGERS' and fromID = ? or toID = ? group by toID, fromID;",
    [userId, userId]
  );
  db.release();
  return res.status(200).json({ notifs });
};

module.exports = {
  getNotifications,
};
