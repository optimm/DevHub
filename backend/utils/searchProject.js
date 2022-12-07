const Project = require("../models/Project");
const paginate = require("./paginate");

const searchProject = async (req, res, searchQuery) => {
  const { q, tags, sortByLikes, sortByComments } = req.query;
  let queryObject = { ...searchQuery };
  const titleQuery = { title: { $regex: q, $options: "i" } };
  const tagQuery = { tags: { $in: tags } };

  if (q) {
    queryObject = { ...queryObject, ...titleQuery };
  }
  if (tags && tags.length > 0) {
    queryObject = { ...queryObject, ...tagQuery };
  }
  let mongoQuery = Project.find(queryObject).populate(
    "owner",
    "name email avatar"
  );
  let data = await paginate(req, res, mongoQuery);
  const total = await Project.countDocuments(queryObject);
  return { data, total };
};

module.exports = searchProject;
