import React from "react";
import { Link } from "react-router-dom";
import {
  MainCard,
  MainCardForm,
  MainCardImage,
  MainCardOverLay,
  MainWrapper,
} from "../styles/loginStyles";

const Login = () => {
  return (
    <>
      <MainWrapper>
        <MainCard>
          <MainCardForm></MainCardForm>
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
