const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const acceptRequest = async (req, res) => {
  const toID = req.body.toID; // dont know from where to get this
  const fromID = req.body.fromID; // dont know from where to get this

  const db = await pool.getConnection();

  const [status] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status === 1) {
    status = 2;
    await db.query(
      "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
      [status, fromID, toID]
    );
    db.release();
    return res.status(200).json({ status: "Request accepted !" });
  } else {
    db.release();
    return res.status(400).json({ status: "Something went wrong!" });
  }
};

const denyRequest = async (req, res) => {
  const toID = req.body.toID; // dont know from where to get this
  const fromID = req.body.fromID; // dont know from where to get this

  const db = await pool.getConnection();

  const [status] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status === 1) {
    status = 0;
    await db.query(
      "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
      [status, fromID, toID]
    );
    db.release();
    return res.status(200).json({ status: "Request accepted !" });
  } else {
    db.release();
    return res.status(400).json({ status: "Something went wrong!" });
  }
};
