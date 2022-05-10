const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const acceptRequest = async (req, res) => {
  const { fromID, toID } = req.body; //but i know from where to get this
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  const [status] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status === 2) {
    // requested
    status = 3; // accepted and now friends

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
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  await db.query(
    "INSERT INTO Friendship (friendshipID,fromID,toID,status) VALUES (?, ?, ?, ?)",
    [friendshipID, fromID, toID, 2]
  );
  db.release();
  return res.status(200).json({
    message: "Friendship request sent successfully.",
  });
};

const blockUser = async (req, res) => {
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  const [status] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status === 3) {
    status = 4; // block from one side
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
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  const [status] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status === 4) {
    status = 3; // block from one side
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

const denyRequest = async (req, res) => {
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

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

module.exports = {
  acceptRequest,
  sendRequest,
  denyRequest,
  blockUser,
  unblockUser,
};
