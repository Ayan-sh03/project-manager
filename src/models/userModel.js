// src/models/userModel.js
const db = require("../config/db");

/**
 * Retrieves a user by email.
 * @param {String} email - User's email.
 * @returns {Object} - User object.
 */
const getUserByEmail = async (email) => {
  const res = await db.query(
    "SELECT users.*, roles.name as role FROM users JOIN roles ON users.role_id = roles.id WHERE email = $1",
    [email]
  );
  return res.rows[0];
};

/**
 * Retrieves a user by ID.
 * @param {Number} id - User's ID.
 * @returns {Object} - User object.
 */
const getUserById = async (id) => {
  const res = await db.query(
    "SELECT users.id, users.username, users.email, roles.name as role FROM users JOIN roles ON users.role_id = roles.id WHERE users.id = $1",
    [id]
  );
  return res.rows[0];
};

/**
 * Creates a new user.
 * @param {Object} user - User details.
 * @returns {Object} - Created user object.
 */
const createUser = async ({ username, email, password, role_id }) => {
  const res = await db.query(
    "INSERT INTO users (username, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role_id, created_at",
    [username, email, password, role_id]
  );
  return res.rows[0];
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
};
