import * as yup from "yup";

let changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "New Password must be atleast 6 characters"),
});

export default registerSchema;
