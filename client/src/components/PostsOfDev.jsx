import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectOfUserQuery } from "../app/services/userApi";
import { PostWrapper } from "../styles/components/postsOfDevStyles";
import { ProjectCardWrapper } from "../styles/components/projectCardStyles";
import { AllProjectCardWrapper } from "../styles/pages/allProjectsStyles";
import { ExtraButton } from "../styles/pages/profileStyles";
import ProjectCard from "./ProjectCard";

const PostsOfDev = ({ isMe }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetProjectOfUserQuery({ id });
  const projectData = data?.data?.data;

  return (
    <PostWrapper>
      {isMe && (
        <ExtraButton primary onClick={() => navigate("/projects/add")}>
          Add Project
        </ExtraButton>
      )}
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

export default PostsOfDev;
