const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  saveProject,
  commentOnProject,
  deleteComment,
} = require("../controllers/project");

router.route("/").get(getAllProjects);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(authMiddleware, updateProject)
  .delete(authMiddleware, deleteProject);

router.route("/create").post(authMiddleware, createProject);
router.route("/:id/like").get(authMiddleware, likeProject);
router.route("/:id/save").get(authMiddleware, saveProject);

router
  .route("/:id/comment")
  .get(authMiddleware, commentOnProject)
  .delete(authMiddleware, deleteComment);
module.exports = router;
