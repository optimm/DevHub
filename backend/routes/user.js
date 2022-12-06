const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const { ifAuthenticated } = require("../middleware/if-autheticated");
const {
  getAllUsers,
  getSingleUser,
  getFollowers,
  getFollowing,
  followUser,
  updateProfile,
  deleteProfile,
} = require("../controllers/user");

router.route("/").get(ifAuthenticated, getAllUsers);
router
  .route("/:id")
  .get(getSingleUser)
  .patch(authMiddleware, updateProfile)
  .delete(authMiddleware, deleteProfile);
router.route("/:id/followers").get(getFollowers);
router.route("/:id/following").get(getFollowing);
router.route("/:id/follow").get(authMiddleware, followUser);

module.exports = router;
