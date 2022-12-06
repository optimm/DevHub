const User = require("../models/User");
const paginate = require("./paginate");

const searchUser = async (req, res, searchQuery, total) => {
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
  const mongoQuery = User.find(queryObject).select("name email avatar");
  const data = await paginate(req, res, mongoQuery);
  return data;
};

module.exports = searchUser;
