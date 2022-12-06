const User = require("../models/User");

const searchUser = async (req, res, searchQuery) => {
  const { q } = req.query;
  let queryObject = { ...searchQuery };
  const userQuery = {
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
  };
  if (q) {
    queryObject = { ...queryObject, ...userQuery };
  }
  const users = await User.find(queryObject).select("name email avatar");
  return users;
};

module.exports = searchUser;
