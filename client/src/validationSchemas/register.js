import * as yup from "yup";

let registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be atleast 2 characters")
    .max(40, "Name cannot be more than 40 characters")
    .test("name", "Name is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .test("name", "Name must be atleast 2 characters", (val) => {
      if (val && val.trim().length < 2) return false;
      return true;
    }),
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be atleast 2 characters")
    .max(10, "Username cannot be more than 10 characters")
    .test("username", "Username is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .test("username", "Username must be atleast 2 characters", (val) => {
      if (val && val.trim().length < 2) return false;
      return true;
    }),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .test("password", "Password is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .test("password", "Password must be atleast 6 characters", (val) => {
      if (val && val.trim().length < 6) return false;
      return true;
    }),
});

export default registerSchema;
