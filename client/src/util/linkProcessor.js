export const linkProcessor = (link) => {
  let start = "https://";
  if (!link.startsWith(start)) {
    link = start + link;
  }
  return link;
};
