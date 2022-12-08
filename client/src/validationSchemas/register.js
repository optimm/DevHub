import * as yup from "yup";

let registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be atleast 2 characters")
    .max(20, "Name cannot be more than 20 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters"),
});

export default registerSchema;
