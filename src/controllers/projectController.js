const projectModel = require("../models/projectModel");

/**
 * Creates a new project.
 */
const createProject = async (req, res) => {
  const { name, description } = req.body;
  const owner_id = req.user.id;

  try {
    const project = await projectModel.createProject({
      name,
      description,
      owner_id,
    });
    res.status(201).json({ message: "Project created successfully.", project });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieves all projects.
 */
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Get All Projects Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieves a single project by ID.
 */
const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await projectModel.getProjectById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json({ project });
  } catch (error) {
    console.error("Get Project By ID Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Updates a project by ID.
 */
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const project = await projectModel.updateProject(id, { name, description });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json({ message: "Project updated successfully.", project });
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Deletes a project by ID.
 */
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await projectModel.deleteProject(id);
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
