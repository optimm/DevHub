const Project = require("../models/Project");
const paginate = require("./paginate");

const searchProject = async (req, res, searchQuery) => {
  const { q, tags, sortByLikes, sortByComments } = req.query;
  let queryObject = { ...searchQuery };
  const tagQuery = { tags: { $in: tags } };

  // const titleQuery = { title: { $regex: q, $options: "i" } };
  // if (q) {
  //   queryObject = { ...queryObject, ...titleQuery };
  // }

  if (tags && tags.length > 0) {
    queryObject = { ...queryObject, ...tagQuery };
  }

  let mongoQuery = Project.find(queryObject).populate(
    "owner",
    "name email avatar"
  );

  let data = await paginate(req, res, mongoQuery);
  if (q) {
    data = data.filter(
      (item) =>
        item.title.includes(q) ||
        item.owner.name.includes(q) ||
        item.owner.email.includes(q)
    );
  }
  const total = data.length;
  return { data, total };
};

module.exports = searchProject;
