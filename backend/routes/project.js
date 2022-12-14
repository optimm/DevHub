const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const { ifAuthenticated } = require("../middleware/if-autheticated");
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

router.route("/").get(ifAuthenticated, getAllProjects);
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
  .post(authMiddleware, commentOnProject)
  .delete(authMiddleware, deleteComment);
module.exports = router;
