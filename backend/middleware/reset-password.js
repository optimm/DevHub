const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const resetPasswordMiddleware = async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    throw new UnauthenticatedError("Token not present");
  }
  const { userId, hash } = jwt.verify(token, process.env.JWT_SECRET);
  if (!userId || !hash) {
    throw new BadRequestError("Link is broken");
  }
  req.user = { userId, hash };
  next();
};

module.exports = { resetPasswordMiddleware };
