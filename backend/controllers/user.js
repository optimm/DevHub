const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const searchUser = require("../utils/searchUser");
const Project = require("../models/Project");

//**************************Generic Routes***********************/
const getAllUsers = async (req, res) => {
  let searchQuery = {};
  if (req.user) {
    const authUserQuery = { _id: { $ne: req.user.userId } };
    searchQuery = { ...authUserQuery };
  }

  const data = await searchUser(req, res, searchQuery);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  let isFollowing = false;
  let isMe = false;
  let user;
  let data;

  if (req?.user?.userId) {
    const userId = req?.user?.userId.toString();
    if (userId === id) {
      user = await User.findById(id).select("-following -followers -projects");
      isMe = true;
      data = { ...user._doc };
    } else {
      user = await User.findById(id).select(
        "-following -projects -saved_projects"
      );
      if (!user) {
        throw new BadRequestError("User does not exist");
      }
      isFollowing = user.followers.some(
        (item) => item.toString() === req?.user?.userId.toString()
      );
      data = { ...user._doc };
      delete data.followers;
    }
  } else {
    user = await User.findById(id).select(
      "-following -followers -projects -saved_projects"
    );
    if (!user) {
      throw new BadRequestError("User does not exist");
    }
    data = { ...user._doc };
  }

  res.status(StatusCodes.OK).json({ success: true, data, isFollowing, isMe });
};

const getFollowers = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const followersId = user.followers;
  const queryObject = { _id: { $in: followersId } };

  const data = await searchUser(req, res, queryObject);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getFollowing = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const followingId = user.following;
  const queryObject = { _id: { $in: followingId } };

  const data = await searchUser(req, res, queryObject);
  res.status(StatusCodes.OK).json({ success: true, data });
};

//To check my auth and send back my data
const checkMyAuth = async (req, res) => {
  const me = await User.findById(req.user.userId).select("name email avatar");
  res.status(StatusCodes.OK).json({ success: true, data: me });
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email, about, profiles, bio } = req.body;
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
  if (bio) me.bio = bio;
  if (profiles) me.profiles = [...profiles];
  await me.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Profile updated" });
};

const deleteProfile = async (req, res) => {
  const { userId } = req.user;
  const me = await User.findById(userId);

  //remove user
  await User.deleteOne({ _id: userId });

  // Delete all projects of the user
  await Project.deleteMany({ owner: userId });

  // Removing user from other's followers whom this user follows
  await User.updateMany({ follower: userId }, { $pull: { followers: userId } });

  // Removing user from other's following
  await User.updateMany(
    { following: userId },
    { $pull: { following: userId } }
  );

  //removing likes of this user from posts

  await Project.updateMany({ likes: userId }, { $pull: { likes: userId } });

  //removing user from posts he saved
  await Project.updateMany({ saved: userId }, { $pull: { saved: userId } });

  //removing comment of this user from posts
  await Project.updateMany(
    { "comments.user": userId },
    { $pull: { comments: { user: userId } } }
  );

  //logout and send res
  res
    .status(StatusCodes.OK)
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .json({ success: true, msg: "Profile Deleted" });
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
    throw new NotFoundError("User not found");
  }

  if (userToFollow.followers.includes(userId) && me.following.includes(id)) {
    me.total_following -= 1;
    userToFollow.total_followers -= 1;
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
    me.total_following += 1;
    userToFollow.total_followers += 1;
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
  checkMyAuth,
  updateProfile,
  deleteProfile,
  followUser,
};
