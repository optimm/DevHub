import * as yup from "yup";

let createProjectSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title should be atleast 2 characters")
    .max(100, "Title cannot be more than 100 characters"),
  desc: yup.string().max(500, "Description cannot be more than 500 characters"),
  github_link: yup
    .string()
    .test(
      "github_link",
      "Either github link or live link is required",
      function (val) {
        if (
          (!val || val === "") &&
          (!this.parent?.live_link || this.parent?.live_link === "")
        )
          return false;
        return true;
      }
    ),
  live_link: yup
    .string()
    .test(
      "live_link",
      "Either github link or live link is required",
      function (val) {
        if (
          (!val || val === "") &&
          (!this.parent?.github_link || this.parent?.github_link === "")
        )
          return false;
        return true;
      }
    ),
  tags: yup.array(yup.string().required("Tag is required")),
});

export default createProjectSchema;
