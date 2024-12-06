// src/middlewares/authMiddleware.js
const jwt = require("../utils/jwt");

/**
 * Middleware to authenticate requests using JWT.
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Authentication Error:", error);
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed." });
  }
};

module.exports = authenticate;
