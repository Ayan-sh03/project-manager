const express = require("express");
const router = express.Router({ mergeParams: true });
const taskController = require("../controllers/taskController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/rbacMiddleware");
const validate = require("../middlewares/validateMiddleware");

/**
 * @route POST /api/projects/:projectId/tasks
 * @desc Create a new task within a project
 * @access Private (Roles: Admin, Project Manager)
 */
router.post(
  "/",
  authenticate,
  authorize(["Admin", "Project Manager"]),
  taskController.createTask
);

/**
 * @route GET /api/projects/:projectId/tasks
 * @desc Get all tasks within a project
 * @access Private (Roles: Admin, Project Manager, Developer, Viewer)
 */
router.get(
  "/",
  authenticate,
  authorize(["Admin", "Project Manager", "Developer", "Viewer"]),
  taskController.getAllTasks
);

/**
 * @route GET /api/projects/:projectId/tasks/:taskId
 * @desc Get a single task by ID within a project
 * @access Private (Roles: Admin, Project Manager, Developer, Viewer)
 */
router.get(
  "/:taskId",
  authenticate,
  authorize(["Admin", "Project Manager", "Developer", "Viewer"]),
  taskController.getTaskById
);

/**
 * @route PUT /api/projects/:projectId/tasks/:taskId
 * @desc Update a task by ID within a project
 * @access Private (Roles: Admin, Project Manager, Developer)
 */
router.put(
  "/:taskId",
  authenticate,
  authorize(["Admin", "Project Manager", "Developer"]),
  taskController.updateTask
);

/**
 * @route DELETE /api/projects/:projectId/tasks/:taskId
 * @desc Delete a task by ID within a project
 * @access Private (Roles: Admin, Project Manager)
 */
router.delete(
  "/:taskId",
  authenticate,
  authorize(["Admin", "Project Manager"]),
  taskController.deleteTask
);

module.exports = router;
