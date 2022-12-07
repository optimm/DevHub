import React from "react";
import { LandingContainer, LandingOverlay } from "../styles/homeStyles";

const Home = () => {
  return (
    <>
      <LandingContainer url="./images/landing.jpg">
        <LandingOverlay></LandingOverlay>
      </LandingContainer>
    </>
  );
};

export default Home;
