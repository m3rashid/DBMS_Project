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
    // requested
    status = 2; // accepted and now friends

    await db.query(
      "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
      [status, fromID, toID]
    );
    db.release();
    return res.status(200).json({ message: "Request accepted !" });
  } else {
    db.release();
    return res.status(400).json({ message: "Something went wrong :( " });
  }
};

const sendRequest = async (req, res) => {
  const friendshipID = uuidv4();
  const fromID = req.userID;
  const toID = req.body.toID;
  const db = await pool.getConnection();

  await db.query(
    "INSERT INTO Friendship (friendshipID,fromID,toID,status) VALUES (?, ?, ?, ?, ?, ?)",
    [friendshipID, fromID, toID, 1]
  );
  db.release();
  return res.status(200).json({
    message: "Friendship request sent successfully.",
  });
};

const blockUser = async (req, res) => {
  const toID = req.body.toID; // dont know from where to get this
  const fromID = req.body.fromID; // dont know from where to get this

  const db = await pool.getConnection();

  const [status] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status === 2) {
    status = 3; // block from one side
    await db.query(
      "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
      [status, fromID, toID]
    );
    db.release();
    return res.status(200).json({ message: "Request accepted !" });
  } else {
    db.release();
    return res.status(400).json({ message: "Something went wrong :( " });
  }
};

const unblockUser = async (req, res) => {
  const toID = req.body.toID; // dont know from where to get this
  const fromID = req.body.fromID; // dont know from where to get this

  const db = await pool.getConnection();

  const [status] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status === 3) {
    status = 2; // block from one side
    await db.query(
      "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
      [status, fromID, toID]
    );
    db.release();
    return res.status(200).json({ message: "Unblock done , now friends :)" });
  } else {
    db.release();
    return res.status(400).json({ message: "Something went wrong :( " });
  }
};
