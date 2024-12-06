const taskModel = require("../models/taskModel");

/**
 * Creates a new task within a project.
 */
const createTask = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, assigned_to, status } = req.body;

  try {
    const task = await taskModel.createTask({
      project_id: projectId,
      title,
      description,
      assigned_to,
      status,
    });
    res.status(201).json({ message: "Task created successfully.", task });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieves all tasks within a project.
 */
const getAllTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await taskModel.getAllTasks(projectId);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Get All Tasks Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieves a single task by ID within a project.
 */
const getTaskById = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const task = await taskModel.getTaskById(projectId, taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error("Get Task By ID Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Updates a task by ID within a project.
 */
const updateTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const { title, description, assigned_to, status } = req.body;

  try {
    const task = await taskModel.updateTask(projectId, taskId, {
      title,
      description,
      assigned_to,
      status,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({ message: "Task updated successfully.", task });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Deletes a task by ID within a project.
 */
const deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    await taskModel.deleteTask(projectId, taskId);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
