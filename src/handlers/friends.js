const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

<<<<<<< HEAD
const acceptRequest = async (req, res) => {
  const toID = req.body.toID; // dont know from where to get this
  const fromID = req.body.fromID; // dont know from where to get this

  const db = await pool.getConnection();

  const [status] = await db.query(
    "Select status from Friendship WHERE fromID = ? AND toID = ?",
    [fromID, toID]
  );

  if (status === 0) {
    status = 1;
  }
  await db.query(
    "update Friendship set status = ? WHERE fromID = ? AND toID = ?",
    [status, fromID, toID]
  );
  db.release();
  return res.status(200).json({ status: "Request accepted !" });
};
=======
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
  
  await db.query("INSERT INTO Friendship (friendshipID,fromID,toID,status,createdAt,updatedAt) VALUES (?,?,?,?,?,?)",[friendshipID,fromID,toID,1,sendDateTime,null]);       // 1 for requested
  db.release();
  return res.status(200).json({ message : "Friendship request sent successfully."})

}

const acceptRequest = async (req ,res) =>{
  const toID = req.body.toID;  // dont know from where to get this
  const fromID = null   // dont know from where to get this
  const [user,_] = await db.query("Select * FROM Friendship WHERE fromID = ? AND toID = ? AND status = ?",[fromID,toID,1])


}

// Todo :
  // 1. Update from --> A x-->B
>>>>>>> 03004e5184b940283723e8e0edeaef0529e7a03c
