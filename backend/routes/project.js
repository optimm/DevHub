const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const { uploadProject } = require("../controllers/project");

router.route("/upload").post(authMiddleware, uploadProject);

module.exports = router;
