// src/utils/jwt.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Generates a JWT token for the given payload.
 * @param {Object} payload - The payload to encode in the JWT.
 * @returns {String} - Signed JWT token.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * Verifies the given JWT token.
 * @param {String} token - The JWT token to verify.
 * @returns {Object} - Decoded payload.
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
