import React from "react";
import { useGetAllUserQuery } from "../app/services/userApi";
import UserCard from "../components/UserCard";
import useWindowDimensions from "../customHooks/useWindowDimensions";
import {
  AllUsersCardWrapper,
  SearchBarWrapper,
} from "../styles/allUsersStyles";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUserQuery();
  const userData = data?.data?.data;
  return (
    <>
      <SearchBarWrapper></SearchBarWrapper>
      <AllUsersCardWrapper>
        {isLoading ? (
          <>Loading...</>
        ) : data?.data?.total > 0 ? (
          userData.map((item, index) => <UserCard user={item} key={item._id} />)
        ) : (
          <>No Data</>
        )}
      </AllUsersCardWrapper>
    </>
  );
};

export default AllUsers;
