const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  throw new Error("BROKEN");
  //   const { name, email, password } = req.body;
  //   if (!email || !name || !password) {
  //     throw new BadRequestError("Please provide name,email and password");
  //   }
  //   const user = User.findOne({ email });
  //   if (user) {
  //     throw new BadRequestError("Email address already in use");
  //   }
  //   user = await User.create({ name, email, password });
  //   res.status(StatusCodes.CREATED).json({ success: true, data: user });
};

const login = (req, res) => {};

module.exports = { register, login };
