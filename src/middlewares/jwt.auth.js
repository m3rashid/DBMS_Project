const { verifyJWT } = require("../utils/jwt");

const checkAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return unauthorizedResponse(res);
  }
  const { valid, expired, payload } = verifyJWT(token);
  if (!valid || expired) {
    return unauthorizedResponse(res);
  }
  req.user = payload.sub;
  next();
};

module.exports = checkAuth;
