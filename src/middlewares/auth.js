const { customLog } = require("../utils/msgLogs");
const jwt = require('jsonwebtoken');

/**
 * Middleware that verifies the token
 * @param {Object} req - express req object
 * @param {Object} req.headers - object containing the predefined/custom header given in the current request
 * @param {string} req.headers.authorization - bearer token
 * @param {Object} res - express res object
 * @param {Object} res.locals - local variables saved from authentication
 * @param {Function} next - express next middleware function
 * @returns the next function if the token is valid
 * @author  gerardo
 */

// Middleware function for authentication
const authenticateToken = (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    // Token is not provided
    return customLog(res, 401, "Missing token!");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, '1234');

    // Attach the decoded token payload to the request object for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    //return res.status(401).json({ message: 'Access denied. Invalid token.' });
        return customLog(res, 404, "Access denied. Invalid token.", error);
  }
};

module.exports = authenticateToken;
