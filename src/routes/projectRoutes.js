const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/rbacMiddleware");
const validate = require("../middlewares/validateMiddleware");

/**
 * @route POST /api/projects
 * @desc Create a new project
 * @access Private (Roles: Admin, Project Manager)
 */
router.post(
  "/",
  authenticate,
  authorize(["Admin", "Project Manager"]),
  projectController.createProject
);

/**
 * @route GET /api/projects
 * @desc Get all projects
 * @access Private (Roles: Admin, Project Manager, Developer, Viewer)
 */
router.get(
  "/",
  authenticate,
  authorize(["Admin", "Project Manager", "Developer", "Viewer"]),
  projectController.getAllProjects
);

/**
 * @route GET /api/projects/:id
 * @desc Get a single project by ID
 * @access Private (Roles: Admin, Project Manager, Developer, Viewer)
 */
router.get(
  "/:id",
  authenticate,
  authorize(["Admin", "Project Manager", "Developer", "Viewer"]),
  projectController.getProjectById
);

/**
 * @route PUT /api/projects/:id
 * @desc Update a project by ID
 * @access Private (Roles: Admin, Project Manager)
 */
router.put(
  "/:id",
  authenticate,
  authorize(["Admin", "Project Manager"]),
  projectController.updateProject
);

/**
 * @route DELETE /api/projects/:id
 * @desc Delete a project by ID
 * @access Private (Roles: Admin)
 */
router.delete(
  "/:id",
  authenticate,
  authorize(["Admin"]),
  projectController.deleteProject
);

module.exports = router;
