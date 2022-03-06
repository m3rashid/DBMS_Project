import JWT from "jsonwebtoken";
import path from "path";
import fs from "fs";

const privateKey = fs.readFileSync(
  path.join(__dirname, "../utils/keys/private.pem"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../utils/keys/public.pem"),
  "utf8"
);

const issueJWT = (user) => {
  const expiresIn = "1d";
  const payload = { sub: user.userId, iat: Date.now() };
  const signedToken = JWT.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

const verifyJWT = (token) => {
  try {
    const extractedToken = token.split(" ")[1];
    const decoded = JWT.verify(extractedToken, publicKey, {
      algorithms: ["RS256"],
    });

    return {
      valid: true,
      expired: false,
      payload: decoded,
    };
  } catch (err) {
    logger.error(err);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      payload: null,
    };
  }
};

export { issueJWT, verifyJWT };
