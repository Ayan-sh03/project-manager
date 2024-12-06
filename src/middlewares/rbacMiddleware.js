// src/middlewares/rbacMiddleware.js

/**
 * Middleware to authorize based on user roles.
 * @param {Array} roles - Array of roles permitted to access the route.
 */
const authorize = (roles = []) => {
  // roles param can be a single role string (e.g., 'Admin') or an array of roles
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions." });
    }
    next();
  };
};

module.exports = authorize;
