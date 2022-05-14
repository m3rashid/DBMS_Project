const rateLimit = require("express-rate-limit");

const authRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes (given here in milliseconds)
  max: 20, // Limit each IP to 20 requests per `window` (here, per 1 minutes)
  standardHeaders: true,
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const regularRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { authRateLimiter, regularRateLimiter };
// use these as middlewares to limit the number of requests
