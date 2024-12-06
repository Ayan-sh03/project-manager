// src/controllers/authController.js
const db = require("../config/db");
const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

/**
 * Registers a new user.
 */
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Get role ID
    const roleRes = await db.query("SELECT id FROM roles WHERE name = $1", [
      role,
    ]);
    if (roleRes.rows.length === 0) {
      return res.status(400).json({ message: "Invalid role specified." });
    }
    const role_id = roleRes.rows[0].id;

    // Create user
    const newUser = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role_id,
    });

    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Logs in a user.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve user
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = generateToken({ id: user.id, role: user.role });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Logs out a user. (For JWT, logout can be handled on client-side by discarding the token)
 */
const logout = async (req, res) => {
  // Since JWT is stateless, to logout we can implement token blacklisting.
  // For simplicity, we'll assume logout is handled on the client side.
  res.status(200).json({ message: "Logout successful." });
};

module.exports = {
  register,
  login,
  logout,
};
