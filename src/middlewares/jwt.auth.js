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

const checkAdmin = (req, res, next) => {
  const { userId } = req;
  if (!userId) return unauthorizedResponse(res);
  try {
    pool.getConnection((error, connection) => {
      if (error) throw new Error(error);

      connection.query(
        `select * from Admin where userID = '${userId}'`,
        (err, result) => {
          if (err || result.length == 0) throw new Error(err);
          next();
        }
      );
    });
  } catch (err) {
    console.log(error);
    return unauthorizedResponse(res);
  }
};

module.exports = { checkAuth, checkAdmin };
