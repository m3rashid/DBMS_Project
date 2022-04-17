const pool = require("../utils/database");
const { verifyJWT } = require("../utils/jwt");

const unauthorizedResponse = (res) => {
  res.status(401).json({
    message: "Unauthorized",
  });
};

const checkAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return unauthorizedResponse(res);
  }
  const { valid, expired, payload } = verifyJWT(token);
  if (!valid || expired) {
    return unauthorizedResponse(res);
  }
  req.userId = payload.sub;
  next();
};

const checkAdmin = async (req, res, next) => {
  const { userId } = req;
  if (!userId) return unauthorizedResponse(res);
  const db = await pool.getConnection();
  const [admins, _] = await db.query("select * from Admin where userID = ?", [
    userId,
  ]);
  db.release();
  if (admins.length === 0) {
    return unauthorizedResponse(res);
  }

  req.admin = admins[0];
  next();
};

module.exports = { checkAuth, checkAdmin };
