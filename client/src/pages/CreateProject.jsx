import React from "react";
import {
  MainLeft,
  MainRight,
  MainWrapper,
} from "../styles/pages/createProjectStyles";

export const CreateProject = () => {
  return (
    <MainWrapper>
      <MainLeft></MainLeft>
      <MainRight>
        <div className="image-wrapper"></div>
      </MainRight>
    </MainWrapper>
  );
};
