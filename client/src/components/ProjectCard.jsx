import React from "react";
import { ProjectCardWrapper } from "../styles/components/projectCardStyles";
import { BiComment } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { Avatar } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <ProjectCardWrapper image={project?.image?.url || "/images/login.jpg"}>
      <div
        className="image-section"
        onClick={() => navigate(`/projects/${project?._id}`)}
      >
        <div className="image-overlay">
          <div className="title">{project?.title}</div>
        </div>
      </div>
      <div className="data-section">
        <div className="likes-comments">
          <div className="likes-left">
            <Link to={`/users/${project?.owner?._id}`}>
              <Avatar
                sx={{ width: 25, height: 25 }}
                src={project?.owner?.avatar?.url}
              ></Avatar>
            </Link>
            <div className="username">{project?.owner?.username}</div>
          </div>
          <div className="likes-right">
            <div className="like-indv">
              {project?.total_likes} <AiFillLike />
            </div>

            <div className="like-indv">
              {project?.total_comments} <BiComment />
            </div>
          </div>
        </div>
      </div>
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
