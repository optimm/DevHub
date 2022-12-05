const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Token not present");
  }
  const { userId, name } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new UnauthenticatedError("Invalid token");
  }
  req.user = { userId, name };
  next();
};
