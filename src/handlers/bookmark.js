const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const pool = require("../utils/database");
const { checkAuth } = require("../middlewares/jwt.auth");

// add your routes here
router.post('/removeBookmark', checkAuth, async (req, res) => {
    const {bookmarkId} = req;
    try{
        const db = await pool.getConnection();
        const [bookmark, _] = await db.query("select * from bookmark where bookmarkId = ?",[
            bookmarkId,
        ]);
        db.query("delete from bookmark where bookmarkId=?",[bookmarkId]);
        db.release();
        return res.status(200).json({
            bookmarkId: bookmarkId
          });
    }catch(e){
        console.log(err);
        return res.status(500).json({
        message: err.message,
        });
    }
})
//

//

module.exports = router;
