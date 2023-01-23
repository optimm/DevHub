import React from "react";
import { ProjectCardWrapper } from "../styles/components/projectCardStyles";
import { BiComment, BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ProjectCard = ({
  project = { title: "Devhub is nice", total_likes: 0, total_comments: 0 },
}) => {
  const navigate = useNavigate();
  return (
    <ProjectCardWrapper image="/images/login.jpg" onClick={() => navigate("/")}>
      <div className="image-section">
        <div className="image-overlay">
          <div className="title">{project?.title} is a kind of chill</div>
        </div>
      </div>
      <div className="data-section">
        <div className="likes-comments">
          <div className="likes-left">
            <Avatar sx={{ width: 25, height: 25 }} />
            <div>Optimm</div>
          </div>
          <div className="likes-right">
            <div className="like-indv">
              {project?.total_likes} <BiComment />
            </div>
            <div className="like-indv">
              {project?.total_comments} <AiFillLike />
            </div>
          </div>
        </div>
      </div>
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
