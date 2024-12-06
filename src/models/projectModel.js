const db = require("../config/db");

/**
 * Creates a new project.
 */
const createProject = async ({ name, description, owner_id }) => {
  const res = await db.query(
    "INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
    [name, description, owner_id]
  );
  return res.rows[0];
};

/**
 * Retrieves all projects.
 */
const getAllProjects = async () => {
  const res = await db.query(
    `SELECT projects.*, users.username as owner
         FROM projects
         JOIN users ON projects.owner_id = users.id`
  );
  return res.rows;
};

/**
 * Retrieves a project by ID.
 */
const getProjectById = async (id) => {
  const res = await db.query(
    `SELECT projects.*, users.username as owner
         FROM projects
         JOIN users ON projects.owner_id = users.id
         WHERE projects.id = $1`,
    [id]
  );
  return res.rows[0];
};

/**
 * Updates a project by ID.
 */
const updateProject = async (id, { name, description }) => {
  const res = await db.query(
    "UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );
  return res.rows[0];
};

/**
 * Deletes a project by ID.
 */
const deleteProject = async (id) => {
  await db.query("DELETE FROM projects WHERE id = $1", [id]);
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
