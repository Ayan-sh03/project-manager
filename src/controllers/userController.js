// src/controllers/userController.js
const db = require("../config/db");
const userModel = require("../models/userModel");

/**
 * Retrieves user profile.
 */
const getProfile = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Example of an admin-only route to get all users.
 */
const getAllUsers = async (req, res) => {
  try {
    const resUsers = await db.query(
      "SELECT users.id, users.username, users.email, roles.name as role FROM users JOIN roles ON users.role_id = roles.id"
    );
    res.status(200).json({ users: resUsers.rows });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Updates user's role.
 */
const updateUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const result = await db.query(
      "UPDATE users SET role_id = $1 WHERE id = $2 RETURNING id, username, email, role_id",
      [roleId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await userModel.getUserById(userId);
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Update User Role Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getProfile,
  getAllUsers,
  updateUserRole,
};
