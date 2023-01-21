import * as yup from "yup";

let editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be atleast 2 characters")
    .max(50, "Name cannot be more than 50 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be atleast 2 characters")
    .max(10, "Username cannot be more than 10 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  bio: yup.string().max(200, "Bio cannot be more than 200 characters"),
  about: yup.string().max(1000, "About cannot be more than 1000 characters"),
});

export default editProfileSchema;
