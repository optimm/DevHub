import React from "react";
import {
  AllUsersProjectsLoaders,
  FullScreenLoaders,
  ProfileLoadingWrapper,
} from "../styles/components/loadingStyles";
import { MagnifyingGlass, Triangle } from "react-loader-spinner";

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
        height="120"
        width="120"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="var(--primary-color)"
      />
    </AllUsersProjectsLoaders>
  );
};

export const ProfileLoader = () => {
  return (
    <ProfileLoadingWrapper>
      <Triangle
        height="120"
        width="120"
        color="var(--primary-color)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </ProfileLoadingWrapper>
  );
};
