// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/rbacMiddleware");

/**
 * @route GET /api/users/profile
 * @desc Get user profile
 * @access Private
 */
router.get("/profile", authenticate, userController.getProfile);

/**
 * @route GET /api/users
 * @desc Get all users (Admin only)
 * @access Private/Admin
 */
router.get("/", authenticate, authorize("Admin"), userController.getAllUsers);

/**
 * @route PUT /api/users/role
 * @desc Update user role (Admin only)
 * @access Private/Admin
 */
router.put(
  "/role",
  authenticate,
  authorize("Admin"),
  userController.updateUserRole
);

module.exports = router;
