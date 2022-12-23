const User = require("../models/User");
const { StatusCodes, BAD_GATEWAY } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, username } = req.body;
  if (!email || !name || !password || !username) {
    throw new BadRequestError("Please provide name,email and password");
  }
  let user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError("Email address already in use");
  }

  user = await User.findOne({ username });
  if (user) {
    throw new BadRequestError("Username already in use");
  }

  user = await User.create({ name, email, username, password });
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: "User registered" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new NotFoundError("User not found");
  }
  //compare password
  const isPasswordTrue = await user.CheckPassword(password);

  if (!isPasswordTrue) {
    throw new UnauthenticatedError("Incorrect password");
  }

  //generate jwt token
  const token = user.CreateJWT();

  // cookie options
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(StatusCodes.OK)
    .cookie("token", token, options)
    .json({
      succcess: true,
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
      },
    });
};

const logout = async (req, res) => {
  const { userId } = req.user;
  res
    .status(StatusCodes.OK)
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .json({ success: true, msg: "Logged out" });
};

const changePassword = async (req, res) => {
  const { userId } = req.user;
  const me = await User.findById(userId).select("+password");
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new BadRequestError("Please provide current and new password");
  }
  const isValid = await me.CheckPassword(currentPassword);
  if (!isValid) {
    throw new UnauthenticatedError("Current password is incorrect");
  }
  if (currentPassword === newPassword) {
    throw new BadRequestError("Cannot use previous password");
  }
  me.password = newPassword;
  await me.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Password changed" });
};

const forgotPassword = async (req, res) => {};
const resetPassword = async (req, res) => {};

module.exports = { register, login, changePassword, logout };
