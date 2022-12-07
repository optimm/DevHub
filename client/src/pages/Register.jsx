import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import {
  MainCard,
  MainCardForm,
  MainCardImage,
  MainCardOverLay,
  MainWrapper,
} from "../styles/loginStyles";
import registerSchema from "../validationSchemas/register";

const Register = () => {
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log({ values });
      resetForm();
    },
  });
  return (
    <>
      <MainWrapper>
        <MainCard>
          <MainCardImage url="./images/register.jpg">
            <MainCardOverLay>
              <div className="heading">Welcome To DevHub.</div>
              <div className="text">
                Devhub is a free platform to display your projects. Create a
                free account today to interact with developers from across the
                globe.
              </div>
              <div className="text">Already have an account ?</div>
              <Link to="/login">
                <button className="card-button">Login</button>
              </Link>
            </MainCardOverLay>
          </MainCardImage>
          <MainCardForm onSubmit={handleSubmit}>
            <div className="inner">
              <div className="form-head">Register</div>
              <TextField
                name="name"
                label="Name"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name ? true : false}
                helperText={touched.name && errors.name ? errors.name : null}
              />
              <TextField
                name="email"
                label="Email"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? true : false}
                helperText={touched.email && errors.email ? errors.email : null}
              />
              <TextField
                name="password"
                type={"password"}
                label="Password"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password ? true : false}
                helperText={
                  touched.password && errors.password ? errors.password : null
                }
              />
              <button className="form-button" type="submit">
                Register
              </button>
            </div>
          </MainCardForm>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default Register;
