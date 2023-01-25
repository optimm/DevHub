import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  LikesIndv,
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
import {
  useGetSingleProjectQuery,
  useLikeUnlikeProjectMutation,
  useSaveUnsaveProjectMutation,
} from "../app/services/projectApi";
import { linkProcessor, timeProcessor } from "../util/utilFunctions";
import { useSelector } from "react-redux";
import AllTagsModal from "../components/AllTagsModal";
import { createNotification } from "../components/Notification";
import LikesModal from "../components/LikesModal";

const Project = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.me);
  const { data, isLoading, isFetching, isSuccess, error, isError } =
    useGetSingleProjectQuery({ id });
  const projectData = data?.data;

  const [likeUnlike, {}] = useLikeUnlikeProjectMutation();
  const [saveUnsave, {}] = useSaveUnsaveProjectMutation();

  const [tagsString, setTagsString] = useState("");
  const [tagMore, setTagMore] = useState(false);
  const [viewAllTags, setViewAllTags] = useState(false);
  const [blankLoader, setBlankLoader] = useState(true);
  const [likesShow, setLikesShow] = useState(false);

  useEffect(() => {
    if (!isFetching && data?.success) {
      let temp = "";
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
  }, [isFetching]);

  useEffect(() => {
    if (isLoading) {
      setBlankLoader(true);
    } else if (!isLoading && data?.success) {
      setTimeout(() => {
        setBlankLoader(false);
      }, 500);
    }
  }, [isLoading]);

  const handleLikeUnlike = async () => {
    if (!isAuthenticated) {
      createNotification(`Please Login First`, "error", 2000);
      navigate("/login");
    } else {
      const { data: likeData, error: likeError } = await likeUnlike({ id });
      if (likeData?.success) {
        createNotification(likeData?.msg, "success", 2000);
      } else if (!likeError?.success) {
        createNotification(likeError?.msg, "error", 2000);
      }
    }
  };
  const handleSaveUnsave = async () => {
    if (!isAuthenticated) {
      createNotification(`Please Login First`, "error", 2000);
      navigate("/login");
    } else {
      const { data: saveData, error: saveError } = await saveUnsave({ id });
      if (saveData?.success) {
        createNotification(saveData?.msg, "success", 2000);
      } else if (!saveError?.success) {
        createNotification(saveError?.msg, "error", 2000);
      }
    }
  };

  return (
    <>
      {isLoading || blankLoader ? (
        <LoadingWrapper project>Loading...</LoadingWrapper>
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
                    <div
                      className="view-more"
                      onClick={() => setViewAllTags(true)}
                    >
                      View All
                    </div>
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
                  <LikesIndv onClick={handleLikeUnlike} checked={data?.isLiked}>
                    <AiFillLike />
                  </LikesIndv>
                  <LikesIndv>
                    <BiComment />
                  </LikesIndv>
                  <LikesIndv>
                    <BiShareAlt />
                  </LikesIndv>
                  <LikesIndv onClick={handleSaveUnsave} checked={data?.isSaved}>
                    <RiBookmarkFill />
                  </LikesIndv>
                </div>
                {isAuthenticated && data?.isMine && (
                  <div className="likes-section">
                    <button className="edit-button">
                      Edit <RiEditFill />
                    </button>
                    <button className="edit-button red">
                      Delete <AiOutlineDelete />
                    </button>
                  </div>
                )}
              </div>

              <div className="likes-section">
                <div className="likes-data" onClick={() => setLikesShow(true)}>
                  Liked by {projectData?.total_likes}{" "}
                  {projectData?.total_likes === 1 ? "User" : "Users"}
                </div>
                {isAuthenticated && data?.isMine && (
                  <div className="likes-data">
                    Saved by {projectData?.total_saves}{" "}
                    {projectData?.total_saves === 1 ? "User" : "Users"}
                  </div>
                )}
              </div>
            </div>
          </ProjectMainWrapper>
          {viewAllTags && (
            <AllTagsModal
              show={viewAllTags}
              setShow={setViewAllTags}
              tags={data?.data?.tags}
            />
          )}
          {likesShow && (
            <LikesModal
              show={likesShow}
              setShow={setLikesShow}
              likes={projectData?.likes}
            />
          )}
        </>
      )}
    </>
  );
};

export default Project;
