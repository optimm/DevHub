import React from "react";
import { useParams } from "react-router-dom";
import {
  ProjectImageWrapper,
  ProjectMainWrapper,
} from "../styles/pages/projectStyles";
import { Avatar } from "@mui/material";
import { BiComment, BiShareAlt } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { RiBookmarkFill } from "react-icons/ri";

const Project = () => {
  const { id } = useParams();
  return (
    <>
      {/* {isLoading || isFetching || blankLoader ? (
        <LoadingWrapper>Loading...</LoadingWrapper>
      ) : */}

      <>
        <ProjectMainWrapper>
          <div className="main-left">
            <div className="data-wrapper">
              <div className="profile-section">
                <Avatar sx={{ width: 50, height: 50 }} />
                <div>
                  <div className="username">Optimm</div>
                  <div className="created-at">Created at Jan 24, 12:30 PM</div>
                </div>
              </div>
              <div className="title">
                Lorem ipsum dolor sit amet consectetur adipisicing
              </div>
              <div className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis porro vel est alias optio veritatis error, nemo,
                voluptates modi, fugit magni quam molestias. Ipsa fugiat ad
                quasi molestias laudantium, ullam nobis, dolores inventore
                harum, molestiae corrupti autem placeat expedita accusamus iure
                magnam. Perferendis odio quia maiores quisquam facere, ipsa amet
                pariatur accusantium ea aliquid molestiae modi tempora
                cupiditate reprehenderit quasi itaque nobis! Excepturi dolore
                cum reprehenderit.
              </div>
              <div className="tags-section">
                <div className="tags-head">Tags</div>
                <div className="tags">Redux, React, Java</div>
              </div>
            </div>
          </div>
          <div className="main-right">
            <ProjectImageWrapper url="/images/login.jpg">
              <div className="project-back"></div>
              <div className="project-image"></div>
            </ProjectImageWrapper>

            <div className="likes-section">
              <div className="likes-indv">
                <AiFillLike />
              </div>
              <div className="likes-indv">
                <BiComment />
              </div>
              <div className="likes-indv">
                <BiShareAlt />
              </div>

              <div className="likes-indv">
                <RiBookmarkFill />
              </div>
            </div>
            <div className="likes-section">
              <div className="likes-data">30 Likes</div>
              <div className="likes-data">40 Comments</div>
            </div>
          </div>
        </ProjectMainWrapper>
      </>
      {/* } */}
    </>
  );
};

export default Project;
