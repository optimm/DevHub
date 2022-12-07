import React from "react";
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
            <MainCardOverLay></MainCardOverLay>
          </MainCardImage>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default Login;
