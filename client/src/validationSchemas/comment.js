import * as yup from "yup";

let commentSchema = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(200, "Comment cannot be more than 200 characters"),
});

export default commentSchema;
