import React from "react";
import UserCard from "../components/UserCard";
import useWindowDimensions from "../customHooks/useWindowDimensions";
import {
  AllUsersCardWrapper,
  SearchBarWrapper,
} from "../styles/allUsersStyles";

const AllUsers = () => {
  return (
    <>
      <SearchBarWrapper></SearchBarWrapper>
      <AllUsersCardWrapper>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
      </AllUsersCardWrapper>
    </>
  );
};

export default AllUsers;
