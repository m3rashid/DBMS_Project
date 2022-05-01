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

  if (status === 1) {  // requested 
    status = 2;        // accepted and now friends
  
    await db.query(
      "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
      [status, fromID, toID]
    );
    db.release();
    return res.status(200).json({ status: "Request accepted !" });
  }
  else {
    db.release();
    return res.status(400).json({message : "Something went wrong :( "});
  }
};

const sendRequest = async (req ,res) =>{
  const friendshipID = uuidv4();
  const fromID = req.userID;
  const toID = req.body.toID;
  const db = await pool.getConnection();

  // get date
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var sendDateTime = date+' '+time;
  
  await db.query("INSERT INTO Friendship (friendshipID,fromID,toID,status,createdAt,updatedAt) VALUES (?,?,?,?,?,?)",[friendshipID,fromID,toID,1,sendDateTime,null]);
  db.release();
  return res.status(200).json({ message : "Friendship request sent successfully."})
}

const blockUser = async (req,res) =>{

  const toID = req.body.toID; // dont know from where to get this
  const fromID = req.body.fromID; // dont know from where to get this

  const db = await pool.getConnection();

  const [status] = await db.query(
  "Select status from Friendship WHERE fromID = ? AND toID = ?",
  [fromID, toID]
);

  if (status === 2) {
    status = 3         // block from one side 
    await db.query(
    "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
    [status, fromID, toID]
  );
    db.release();
    return res.status(200).json({ status: "Request accepted !" });

  }
  else {
    db.release();
    return res.status(400).json({message : "Something went wrong :( "});
  }
}

const unblockUser = async (req,res) =>{

  const toID = req.body.toID; // dont know from where to get this
  const fromID = req.body.fromID; // dont know from where to get this

  const db = await pool.getConnection();

  const [status] = await db.query(
  "Select status from Friendship WHERE fromID = ? AND toID = ?",
  [fromID, toID]
);

  if (status === 3) {
    status = 2         // block from one side 
    await db.query(
    "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
    [status, fromID, toID]
  );
    db.release();
    return res.status(200).json({ status: "Unblock done , now friends :)" });

  }
  else {
    db.release();
    return res.status(400).json({message : "Something went wrong :( "});
  }
}