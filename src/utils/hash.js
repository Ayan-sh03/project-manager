// src/utils/hash.js
const bcrypt = require("bcrypt");

/**
 * Hashes a plain text password.
 * @param {String} password - The plain text password.
 * @returns {String} - Hashed password.
 */
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compares a plain text password with a hashed password.
 * @param {String} password - The plain text password.
 * @param {String} hashedPassword - The hashed password.
 * @returns {Boolean} - True if passwords match, else false.
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
