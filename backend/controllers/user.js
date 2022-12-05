const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getMyData = async (req, res) => {
  const me = await User.findById(req.user.userId);
  res.status(StatusCodes.OK).json({ success: true, data: me });
};

const getAllUsers = async (req, res) => {
  if (req.user) {
    const users = await User.find({ _id: { $ne: req.user.userId } }).select(
      "name avatar email"
    );
    res.status(StatusCodes.OK).json({ success: true, data: users });
  } else {
    const users = await User.find({}).select("name avatar email");
    res.status(StatusCodes.OK).json({ success: true, data: users });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new BadRequestError("User does not exist");
  }
  res.status(StatusCodes.OK).json({ success: true, data: user });
};

const followUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  if (id === userId) {
    throw new BadRequestError("Cannot follow yourself");
  }
  const userToFollow = await User.findById(id);
  const me = await User.findById(userId);
  if (!userToFollow) {
    throw new BadRequestError("User you are trying to follow does not exist");
  }

  if (userToFollow.followers.includes(userId) && me.following.includes(id)) {
    const index1 = userToFollow.followers.indexOf(userId);
    const index2 = me.following.indexOf(id);
    userToFollow.followers.splice(index1, 1);
    me.following.splice(index2, 1);
    userToFollow.save();
    me.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: `unfollowed ${userToFollow.name}` });
  } else {
    userToFollow.followers.push(userId);
    me.following.push(id);
    userToFollow.save();
    me.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: `followed ${userToFollow.name}` });
  }
};

const updateUser = async (req, res) => {};

module.exports = {
  getMyData,
  getAllUsers,
  getSingleUser,
  followUser,
  updateUser,
};
