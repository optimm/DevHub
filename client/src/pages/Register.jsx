import React from "react";
import { Link } from "react-router-dom";
import {
  MainCard,
  MainCardForm,
  MainCardImage,
  MainCardOverLay,
  MainWrapper,
} from "../styles/loginStyles";

const Register = () => {
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
          <MainCardForm></MainCardForm>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default Register;
