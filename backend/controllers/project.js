const Project = require("../models/Project");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const searchProject = require("../utils/searchProject");
const User = require("../models/User");

const getAllProjects = async (req, res) => {
  let searchQuery = {};
  if (req.user) {
    const authUserQuery = { owner: { $ne: req.user.userId } };
    searchQuery = { ...authUserQuery };
  }
  const data = await searchProject(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getSingleProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    throw new BadRequestError("Project does not exist");
  }
  res.status(StatusCodes.OK).json({ success: true, data: project });
};

const createProject = async (req, res) => {
  const { userId } = req.user;
  const me = await User.findById(userId);
  const { title, live_link, github_link } = req.body;
  if (!title || (title && !live_link && !github_link)) {
    throw new BadRequestError("Title and one link for project is required");
  }
  const project = await Project.create({ ...req.body, owner: userId });
  me.projects.unshift(project._id);
  me.total_projects += 1;
  await me.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Project Created" });
};

const updateProject = async (req, res) => {};
const deleteProject = async (req, res) => {};

const likeProject = async (req, res) => {};
const saveProject = async (req, res) => {};
const commentOnProject = async (req, res) => {};

const deleteComment = async (req, res) => {};

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  saveProject,
  commentOnProject,
  deleteComment,
};
