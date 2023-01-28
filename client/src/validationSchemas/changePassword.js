import * as yup from "yup";

let changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current Password is required")
    .test("currentPassword", "Current Password is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    }),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "New Password must be atleast 6 characters")
    .test("newPassword", "New Password is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .test("newPassword", "New Password must be atleast 6 characters", (val) => {
      if (val && val.trim().length < 6) return false;
      return true;
    }),
});

export default changePasswordSchema;
