const app = require("../../../index");
const { authRateLimiter } = require("../../utils/rateLimit");
const login = require("./login");
const signup = require("./signup");

app.post("/auth/login", authRateLimiter, login);
app.post("/auth/signup", authRateLimiter, signup);
