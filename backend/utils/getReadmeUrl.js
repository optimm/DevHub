const axios = require("axios");
const getReadmeUrl = async ({ github_link }) => {
  const regex = /(?:https:\/\/)?github.com\/([\w-]+)\/([\w-]+)/;
  const match = github_link.match(regex);
  let link = null;

  if (match) {
    const url = `${match[1]}/${match[2]}`;
    try {
      const { data } = await axios.get(
        `https://api.github.com/repos/${url}/readme`
      );
      link = data?.download_url;
    } catch (error) {}
  }
  return link;
};

module.exports = getReadmeUrl;
