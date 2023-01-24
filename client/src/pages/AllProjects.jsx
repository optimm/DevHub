import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetAllProjectsQuery } from "../app/services/projectApi";
import ProjectCard from "../components/ProjectCard";
import { AllProjectCardWrapper } from "../styles/pages/allProjectsStyles";
import { SearchBarWrapper } from "../styles/pages/allUsersStyles";

const AllProjects = () => {
  const { data, isLoading } = useGetAllProjectsQuery();
  const projectData = data?.data?.data;
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
      <AllProjectCardWrapper>
        {isLoading ? (
          <>Loading...</>
        ) : data?.data?.total > 0 ? (
          projectData.map((item, index) => (
            <ProjectCard project={item} key={index} />
          ))
        ) : (
          <>No Data</>
        )}
      </AllProjectCardWrapper>
    </>
  );
};

export default AllProjects;
