import React, { useState } from "react";
import { useGetAllUserQuery } from "../app/services/userApi";
import UserCard from "../components/UserCard";
import {
  AllUsersCardWrapper,
  SearchBarWrapper,
} from "../styles/pages/allUsersStyles";
import { IconButton, InputBase, Paper } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUserQuery();
  const userData = data?.data?.data;
  const [value, setValue] = useState("");
  return (
    <>
      <SearchBarWrapper>
        <Paper
          elevation={1}
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
          className="search-bar-paper"
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Developers"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <IconButton sx={{ p: "10px" }} aria-label="search" disabled>
            <AiOutlineSearch />
          </IconButton>
        </Paper>
      </SearchBarWrapper>
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
