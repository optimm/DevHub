const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

//**************************Generic Routes***********************/
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

const getFollowers = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate(
    "followers",
    "name email avatar _id"
  );
  if (!user) {
    throw new BadRequestError("User does not exist");
  }
  const followersId = user.followers;
  res.status(StatusCodes.OK).json({ success: true, data: user.followers });
};

const getFollowing = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate(
    "following",
    "name email avatar _id"
  );
  if (!user) {
    throw new BadRequestError("User does not exist");
  }
  res.status(StatusCodes.OK).json({ success: true, data: user.following });
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email, about, profiles } = req.body;
  const me = await User.findById(userId);
  if (email) {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError("Email already in use");
    }
    me.email = email;
  }
  if (name) me.name = name;
  if (about) me.about = about;
  if (profiles) me.profiles = [...profiles];
  await me.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Profile updated" });
};

const deleteProfile = async (req, res) => {
  const { userId } = req.user;
  const me = await User.findById(userId);
  res.status(StatusCodes.OK).json({ success: true, msg: "Profile Deleted" });
};

//follow unfollow route
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
    await userToFollow.save();
    await me.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: `Unfollowed ${userToFollow.name}` });
  } else {
    userToFollow.followers.push(userId);
    me.following.push(id);
    await userToFollow.save();
    await me.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: `Followed ${userToFollow.name}` });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getFollowers,
  getFollowing,
  updateProfile,
  deleteProfile,
  followUser,
};
