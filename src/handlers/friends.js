const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

const sendRequest = async (req, res) => {
  const friendshipID = uuidv4();
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  let [status, _] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status.length > 0 && status[0].status === "REQUESTED") {
    return res.status(200).json({
      message: "Friendship Already Sent.",
    });
  }

  await db.query(
    "INSERT INTO Friendship (friendshipID,fromID,toID,status) VALUES (?, ?, ?, ?)",
    [friendshipID, fromID, toID, 2]
  );
  db.release();
  return res.status(200).json({
    message: "Friendship request sent successfully.",
  });
};


const unSendRequest = async (req, res) => {
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  await db.query("Delete FROM Friendship WHERE fromID = ? AND toID = ?", [
    fromID,
    toID,
  ]);
  db.release();
  return res.status(200).json({
    message: "Friendship request unsended successfully.",
  });
};

const acceptRequest = async (req, res) => {
  const { fromID, toID } = req.body; //but i know from where to get this
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  await db.query(
    "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
    [3, toID, fromID]
  );
  db.release();
  return res.status(200).json({ message: "Request accepted !" });
};


const denyRequest = async (req, res) => {
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  await db.query("Delete from Friendship WHERE fromID = ? AND toID = ?", [
    toID,
    fromID,
  ]);
  db.release();
  return res.status(200).json({ status: "Request accepted !" });
};


const unFriend = async (req, res) => {
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  await db.query("Delete from Friendship WHERE fromID = ? AND toID = ?", [
    toID,
    fromID,
  ]);
  db.release();
  return res.status(200).json({ status: "Request accepted !" });
};



const blockUser = async (req, res) => {
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  await db.query(
    "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
    [4, fromID, toID]
  );
  db.release();
  return res.status(200).json({ message: "Blocked User Successfully!" });
};



const unblockUser = async (req, res) => {
  const { fromID, toID } = req.body;
  if (!fromID) throw new Error("No from ID");
  if (!toID) throw new Error("No to ID");

  const db = await pool.getConnection();

  await db.query(
    "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
    [3, fromID, toID]
  );
  db.release();
  return res.status(200).json({ message: "Unblock Successfully :)" });
};

module.exports = {
  sendRequest,
  unSendRequest,
  acceptRequest,
  denyRequest,
  unFriend,
  blockUser,
  unblockUser,
};
