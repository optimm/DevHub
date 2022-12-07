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
import loginSchema from "../validationSchemas/login";

const Login = () => {
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
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log({ values });
      resetForm();
    },
  });
  return (
    <>
      <MainWrapper>
        <MainCard>
          <MainCardForm onSubmit={handleSubmit} login>
            <div className="inner">
              <div className="form-head">Login</div>
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
                Login
              </button>
            </div>
          </MainCardForm>
          <MainCardImage url="./images/login.jpg">
            <MainCardOverLay>
              <div className="heading">Welcome Back Mate.</div>
              <div className="text">
                Login and you can like, comment and save other's projects. You
                can also post and manage your own precious projects and let the
                world appreciate.
              </div>
              <div className="text">Don't have an account ?</div>
              <Link to="/register">
                <button className="card-button">Register</button>
              </Link>
            </MainCardOverLay>
          </MainCardImage>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default Login;
