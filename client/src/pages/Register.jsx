import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../app/services/authApi";
import { AiFillHome } from "react-icons/ai";
import {
  MainCard,
  MainCardForm,
  MainCardImage,
  MainCardOverLay,
  MainHomeButton,
  MainWrapper,
} from "../styles/loginStyles";
import registerSchema from "../validationSchemas/register";
import { createNotification } from "../components/Notification";

const Register = () => {
  const [
    register,
    { data, error: requestError, isLoading, isError, isSuccess },
  ] = useRegisterMutation();
  const navigate = useNavigate();
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
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      await register({ body: values });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      createNotification(data.msg, "success", 2000);
      navigate("/login");
    }
  }, [isSuccess]);

  console.log(requestError);

  return (
    <>
      <MainWrapper>
        <MainHomeButton>
          <Link to="/">
            <AiFillHome />
          </Link>
        </MainHomeButton>
        <MainCard>
          <MainCardImage url="/images/register.jpg">
            <MainCardOverLay>
              <div className="heading">Dive into DevHub Today.</div>
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
                name="username"
                label="Username"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && errors.username ? true : false}
                helperText={
                  touched.username && errors.username ? errors.username : null
                }
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
              <button
                className="form-button"
                type="submit"
                disabled={isLoading}
              >
                {"Register"}
              </button>
              {isError && (
                <div className="error">{requestError?.data?.msg}</div>
              )}
            </div>
          </MainCardForm>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default Register;
