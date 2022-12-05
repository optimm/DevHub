const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getMyData = async (req, res) => {
  const me = await User.findById(req.user.userId);
  res.status(StatusCodes.OK).json({ success: true, data: me });
};

const getAllUsers = async (req, res) => {};

const getSingleUser = async (req, res) => {};

const followUser = async (req, res) => {};

const updateUser = async (req, res) => {};

module.exports = {
  getMyData,
  getAllUsers,
  getSingleUser,
  followUser,
  updateUser,
};
