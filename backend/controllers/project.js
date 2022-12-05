const Project = require("../models/Project");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const uploadProject = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "User authenticated to upload" });
};
module.exports = { uploadProject };
