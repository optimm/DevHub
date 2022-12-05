const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const { ifAuthenticated } = require("../middleware/if-autheticated");
const {
  getMyData,
  getAllUsers,
  getSingleUser,
  followUser,
  updateUser,
} = require("../controllers/user");

router.route("/me").get(authMiddleware, getMyData);
router.route("/").get(ifAuthenticated, getAllUsers);
router.route("/:id").get(getSingleUser);
router.route("/follow/:id").get(authMiddleware, followUser);

module.exports = router;
