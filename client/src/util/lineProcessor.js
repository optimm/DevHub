export const lineProcessor = (text, size) => {
  if (text.length < size) return text;
  let temp = text.substring(0, size);
  temp += "...";
  return temp;
};
