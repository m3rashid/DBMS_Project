const { v4: uuidv4 } = require("uuid");

const pool = require("../utils/database");

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
  
  await db.query("INSERT INTO Friendship (friendshipID,fromID,toID,status,createdAt,updatedAt) VALUES (?,?,?,?,?,?)",[friendshipID,fromID,toID,0,sendDateTime,null]);
  db.release();
  return res.status(200).json({ message : "Friendship request sent successfully."})
}