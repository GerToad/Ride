const rateLimit = require("express-rate-limit");

/**
 * General rate limiter middleware for the server.
 * @returns a middleware function to limit the reate of requests to the server
 * @author rafaelg5_x
 */
exports.generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "You have exceeded the 100 requests in the 15 min limit!",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});