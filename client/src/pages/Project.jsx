import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ProjectImageWrapper,
  ProjectMainWrapper,
} from "../styles/pages/projectStyles";
import { Avatar } from "@mui/material";
import { BiComment, BiShareAlt } from "react-icons/bi";
import { AiFillLike, AiOutlineDelete } from "react-icons/ai";
import { RiBookmarkFill, RiEditFill } from "react-icons/ri";

import {
  LoadingWrapper,
  ProfileIndv,
  SoloButton,
} from "../styles/pages/profileStyles";
import ProfileIcon from "../components/ProfileIcon";
import { useGetSingleProjectQuery } from "../app/services/projectApi";
import { linkProcessor, timeProcessor } from "../util/utilFunctions";

const Project = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess, error, isError } =
    useGetSingleProjectQuery({ id });
  const projectData = data?.data;

  const [tagsString, setTagsString] = useState("");
  const [tagMore, setTagMore] = useState(false);

  useEffect(() => {
    if (data?.success) {
      let temp = "";
      console.log(data?.data?.tags?.length);
      if (data?.data?.tags?.length > 0) {
        let arr = data?.data?.tags;
        for (let i = 0; i < arr.length; i++) {
          let t = temp;
          if (i > 0) {
            t += ", ";
          }
          t += arr[i];
          if (t.length > 40) {
            setTagMore(true);
            temp += "...";
            break;
          } else {
            temp = t;
          }
        }
        setTagsString(temp);
      }
    }
  }, [data]);

  return (
    <>
      {isLoading || isFetching ? (
        <LoadingWrapper>Loading...</LoadingWrapper>
      ) : (
        <>
          <ProjectMainWrapper>
            <div className="main-left">
              <div className="data-wrapper">
                <div className="profile-section">
                  <Link to={`/users/${projectData?.owner?._id}`}>
                    <Avatar sx={{ width: 50, height: 50 }} />
                  </Link>

                  <div>
                    <div className="username">
                      {projectData?.owner?.username}
                    </div>
                    <div className="created-at">
                      Created - {timeProcessor(projectData?.created_at)}
                    </div>
                  </div>
                </div>
                <div className="title">{projectData?.title}</div>
                <div className="desc">{projectData?.desc}</div>
                <div className="tags-section">
                  <div className="tags-head">Tags</div>
                  <div className="tags">
                    {tagsString}
                    <div className="view-more">View All</div>
                  </div>
                </div>
                <div className="links-section">
                  {projectData?.github_link && (
                    <ProfileIndv
                      onClick={() =>
                        window.open(linkProcessor(projectData?.github_link))
                      }
                    >
                      <ProfileIcon platform={"github"} />
                    </ProfileIndv>
                  )}
                  {projectData?.live_link && (
                    <ProfileIndv
                      onClick={() =>
                        window.open(linkProcessor(projectData?.live_link))
                      }
                    >
                      <ProfileIcon platform={"website"} />
                    </ProfileIndv>
                  )}
                </div>
              </div>
            </div>
            <div className="main-right">
              <ProjectImageWrapper url="/images/login.jpg">
                <div className="project-back"></div>
                <div className="project-image"></div>
              </ProjectImageWrapper>

              <div className="flex-justify">
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
                  <button className="edit-button">
                    Edit <RiEditFill />
                  </button>
                  <button className="edit-button red">
                    Delete <AiOutlineDelete />
                  </button>
                </div>
              </div>

              <div className="likes-section">
                <div className="likes-data">
                  Liked by {projectData?.total_likes} Users
                </div>
              </div>
            </div>
          </ProjectMainWrapper>
        </>
      )}
    </>
  );
};

export default Project;
