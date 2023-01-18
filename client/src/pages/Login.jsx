import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNotification } from "../components/Notification";
import { useLoginMutation } from "../app/services/authApi";
import {
  MainCard,
  MainCardForm,
  MainCardImage,
  MainCardOverLay,
  MainHomeButton,
  MainWrapper,
} from "../styles/loginStyles";
import loginSchema from "../validationSchemas/login";
import { AiFillHome } from "react-icons/ai";

const Login = () => {
  const [login, { data, error: requestError, isLoading, isError, isSuccess }] =
    useLoginMutation();
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
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await login({ body: values });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      createNotification(`Welcome ${data?.data?.name}`, "success", 2000);
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <>
      <MainWrapper>
        <MainHomeButton>
          <Link to="/">
            <AiFillHome />
          </Link>
        </MainHomeButton>
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

              {isError && (
                <div className="error">{requestError?.data?.msg}</div>
              )}
            </div>
          </MainCardForm>
          <MainCardImage url="/images/login.jpg">
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
