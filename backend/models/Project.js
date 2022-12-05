const mongoose = require("mongoose");
const User = require("./User");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    max: [50, "Descripition cannot be more than 50 characters"],
  },
  image: {
    public_id: String,
    url: String,
  },
  desc: {
    type: String,
    max: [200, "Descripition cannot be more than 300 characters"],
  },
  github_link: {
    type: String,
    required: [
      function () {
        return this.live_link === null;
      },
      "Code base or live link should be provided",
    ],
  },
  live_link: {
    type: String,
    required: [
      function () {
        return this.github_link === null;
      },
      "Code base or live link should be provided",
    ],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: { type: String, required: [true, "Please provide a comment"] },
    },
  ],
  saved: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});