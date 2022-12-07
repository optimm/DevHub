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
  const project = await Project.findById(id).populate(
    "owner",
    "name email avatar"
  );
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

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  await User.updateOne({ _id: userId }, { $pull: { projects: id } });
  await Project.deleteOne({ _id: id });
  res.status(StatusCodes.OK).json({ success: true, msg: "Porject deleted" });
};

const likeProject = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const project = Project.findById(id);
  if (project.likes.includes(userId)) {
    const index = project.likes.indexOf(userId);
    project.likes.splice(index, 1);
    await project.save();
    res.status(StatusCodes.OK).json({ success: true, msg: "Project unliked" });
  } else {
    project.likes.push(userId);
    await project.save();
    res.status(StatusCodes.OK).json({ success: true, msg: "Project liked" });
  }
};

const saveProject = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const me = User.findById(userId);
  const project = Project.findById(id);
  if (project.saved.includes(userId) && me.saved_projects.includes(id)) {
    const index = project.saved.indexOf(userId);
    const index2 = me.saved_projects.indexOf(id);
    project.saved.splice(index, 1);
    me.saved_projects.splice(index2, 1);
    await project.save();
    await me.save();
    res.status(StatusCodes.OK).json({ success: true, msg: "Project unsaved" });
  } else {
    project.saved.push(userId);
    me.saved_projects.push(id);
    await project.save();
    await me.save();
    res.status(StatusCodes.OK).json({ success: true, msg: "Project saved" });
  }
};

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
