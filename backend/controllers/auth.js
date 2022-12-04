const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError("Please provide name,email and password");
  }
  let user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError("Email address already in use");
  }
  user = await User.create({ name, email, password });
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
    throw new UnauthenticatedError("User does not exist");
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
    .json({ user: { name: user.name }, token });
};

module.exports = { register, login };
