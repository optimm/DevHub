import React from "react";
import { LandingContainer, LandingOverlay } from "../styles/homeStyles";

const Home = () => {
  return (
    <>
      <LandingContainer url="/images/landing.jpg">
        <LandingOverlay>
          <div className="section-main">
            <div className="text-main">
              Welcome To <span className="text-main-span">DevHub</span>
            </div>
            <div className="text-sub">
              Discover creative projects and developers from across the globe. A
              portal for you to share your projects and get inspired for free.
            </div>
            <div className="button-container">
              <button className="button-main">Discover Projects</button>
            </div>
          </div>
        </LandingOverlay>
      </LandingContainer>
    </>
  );
};

export default Home;
