const express = require("express");

const router = express.Router();

const { register, login, changePassword, checkMyAuth } = require("../controllers/auth");
const { authMiddleware } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(authMiddleware, checkMyAuth);
router.route("/change-password").put(authMiddleware, changePassword);

module.exports = router;
