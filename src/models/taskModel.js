const db = require("../config/db");

/**
 * Creates a new task within a project.
 */
const createTask = async ({
  project_id,
  title,
  description,
  assigned_to,
  status,
}) => {
  const res = await db.query(
    "INSERT INTO tasks (project_id, title, description, assigned_to, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [project_id, title, description, assigned_to, status]
  );
  return res.rows[0];
};

/**
 * Retrieves all tasks within a project.
 */
const getAllTasks = async (project_id) => {
  const res = await db.query(
    `SELECT tasks.*, users.username as assignee
         FROM tasks
         JOIN users ON tasks.assigned_to = users.id
         WHERE tasks.project_id = $1`,
    [project_id]
  );
  return res.rows;
};

/**
 * Retrieves a task by ID within a project.
 */
const getTaskById = async (project_id, task_id) => {
  const res = await db.query(
    `SELECT tasks.*, users.username as assignee
         FROM tasks
         JOIN users ON tasks.assigned_to = users.id
         WHERE tasks.project_id = $1 AND tasks.id = $2`,
    [project_id, task_id]
  );
  return res.rows[0];
};

/**
 * Updates a task by ID within a project.
 */
const updateTask = async (
  project_id,
  task_id,
  { title, description, assigned_to, status }
) => {
  const res = await db.query(
    `UPDATE tasks
         SET title = $1, description = $2, assigned_to = $3, status = $4
         WHERE project_id = $5 AND id = $6 RETURNING *`,
    [title, description, assigned_to, status, project_id, task_id]
  );
  return res.rows[0];
};

/**
 * Deletes a task by ID within a project.
 */
const deleteTask = async (project_id, task_id) => {
  await db.query("DELETE FROM tasks WHERE project_id = $1 AND id = $2", [
    project_id,
    task_id,
  ]);
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
