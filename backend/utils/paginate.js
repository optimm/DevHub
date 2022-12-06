const paginate = async (req, res, mongoQuery) => {
  const { page, limit } = req.query;
  let data;
  if (page && limit) {
    data = await mongoQuery.skip((page - 1) * limit).limit(limit);
  } else {
    if (limit) {
      data = await mongoQuery.limit(limit);
    } else {
      data = await mongoQuery;
    }
  }
  return data;
};

module.exports = paginate;
