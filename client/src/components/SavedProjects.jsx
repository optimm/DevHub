import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSavedProjectsQuery } from "../app/services/userApi";
import { PostWrapper } from "../styles/components/postsOfDevStyles";
import { AllProjectCardWrapper } from "../styles/pages/allProjectsStyles";
import ProjectCard from "./ProjectCard";

const SavedProjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetSavedProjectsQuery();
  const projectData = data?.data?.data;
  return (
    <PostWrapper>
      <AllProjectCardWrapper noPad>
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
    </PostWrapper>
  );
};

export default SavedProjects;
