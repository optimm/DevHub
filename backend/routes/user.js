const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middleware/auth");
const {
  getMyData,
  getAllUsers,
  getSingleUser,
  followUser,
  updateUser,
} = require("../controllers/user");

router.route("/me").get(authMiddleware, getMyData);
router.route("/all").get(getAllUsers);

module.exports = router;
