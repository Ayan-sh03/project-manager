// src/config/db.js
const { Pool } = require("pg");
require("dotenv").config();

/**
 * Database configuration using pg Pool for connection pooling.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
