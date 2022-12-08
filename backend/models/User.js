const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { emailReg } = require("../utils/validation");
const Project = require("./Project");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [emailReg, "Please provide a valid email"],
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  about: {
    type: String,
    max: [200, "About cannot be more than 500 characters"],
  },
  bio: {
    type: String,
    max: [200, "Bio cannot be more than 150 characters"],
  },
  profiles: [
    {
      link: {
        type: String,
        required: [true, "Please provide a link"],
      },
      platform: {
        type: String,
        required: [true, "Please provide the platform name"],
      },
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  saved_projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  total_followers: {
    type: Number,
    default: 0,
  },
  total_following: {
    type: Number,
    default: 0,
  },
  total_projects: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.CheckPassword = async function (userPassword) {
  const ismatch = await bcrypt.compare(userPassword, this.password);
  return ismatch;
};

// generating the jwt token
UserSchema.methods.CreateJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = mongoose.model("User", UserSchema);
