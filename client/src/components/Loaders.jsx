import React from "react";
import {
  AllUsersProjectsLoaders,
  FullScreenLoaders,
} from "../styles/components/loadingStyles";
import { MagnifyingGlass } from "react-loader-spinner";

export const FullScreenLoader = () => {
  return (
    <FullScreenLoaders>
      <img className="image" src="/images/cat.gif"></img>
      <div className="text">
        <span>Dev</span>hub
      </div>
    </FullScreenLoaders>
  );
};

export const AllUsersProjectsLoader = () => {
  return (
    <AllUsersProjectsLoaders>
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="var(--primary-color)"
      />
    </AllUsersProjectsLoaders>
  );
};
