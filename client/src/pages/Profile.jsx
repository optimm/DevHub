import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MoreDataWrapper,
  ProfileImageWrapper,
  ProfileMainWrapper,
} from "../styles/profileStyles";
import {
  RiUserFollowLine,
  RiMailOpenLine,
  RiUserUnfollowLine,
  RiEditFill,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import {
  AiFillInstagram,
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillFacebook,
} from "react-icons/ai";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
} from "../app/services/userApi";
import { useLogoutQuery } from "../app/services/authApi";
import { createNotification } from "../components/Notification";
import { linkProcessor } from "../util/linkProcessor";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "../app/services/baseApi";
import FModal from "../components/FModal";

const ProfileIcon = ({ platform }) => {
  if (platform === "github") {
    return <AiFillGithub />;
  }
  if (platform === "instagram") {
    return <AiFillInstagram />;
  }
  if (platform === "linkedin") {
    return <AiFillLinkedin />;
  }
  if (platform === "facebook") {
    return <AiFillFacebook />;
  }
  if (platform === "twitter") {
    return <AiFillTwitterCircle />;
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isAuthenticated } = useSelector((state) => state.me);
  const [skip, setSkip] = useState(true);
  const [fmodal, setFmodal] = useState(false);
  const [fmodalcat, setFmodalCat] = useState("");
  //queries
  const { data, isLoading, isFetching } = useGetSingleUserQuery({
    id,
  });
  const { isError: isLogoutError, isSuccess: isLogoutSuccess } = useLogoutQuery(
    { id },
    { skip }
  );
  const [
    followFunction,
    {
      data: followData,
      isLoading: isFollowLoading,
      isError: isFollowError,
      isSuccess: isFollowSuccess,
    },
  ] = useFollowUserMutation();

  useEffect(() => {
    if (isLogoutError) {
      createNotification(`Something went wrong`, "error", 2000);
    } else if (isLogoutSuccess) {
      createNotification(`Logged out successfully`, "success", 2000);
      navigate("/");
    }
  }, [isLogoutError, isLogoutSuccess]);

  useEffect(() => {
    if (isFollowError) {
      createNotification(`Something went wrong`, "error", 2000);
    } else if (isFollowSuccess) {
      createNotification(followData?.msg, "success", 2000);
    }
  }, [isFollowError, isFollowSuccess]);

  const handleLogout = () => {
    setSkip(false);
  };
  const handleFollow = async () => {
    if (!isAuthenticated) {
      createNotification(`Please Login First`, "error", 2000);
      navigate("/login");
    } else {
      await followFunction({ id });
    }
  };

  return (
    <>
      {isLoading || isFetching ? (
        <>Loading</>
      ) : (
        <>
          <ProfileMainWrapper>
            <div className="main-left">
              <div className="user-data">
                <div className="name-section">
                  <div className="name">{data?.data?.name}</div>
                  <div className="username">{data?.data?.username}</div>
                  <div className="bio">{data?.data?.bio}</div>
                </div>
                <div className="sepration" />
                <div className="numbers-section">
                  <div className="posts">
                    <span>{data?.data?.total_projects}</span> Projects
                  </div>
                  <div className="follower-section">
                    <div
                      className="follower-section-sub"
                      onClick={() => {
                        setFmodalCat("followers");
                        setFmodal(true);
                      }}
                    >
                      <span>{data?.data?.total_followers}</span> Followers
                    </div>
                    <div
                      className="follower-section-sub"
                      onClick={() => {
                        setFmodalCat("following");
                        setFmodal(true);
                      }}
                    >
                      <span>{data?.data?.total_following}</span> Following
                    </div>
                  </div>
                </div>
                <div className="sepration" />

                <div className="button-section">
                  {data?.isMe ? (
                    <>
                      <button>
                        <RiEditFill /> Profile
                      </button>
                      <button onClick={handleLogout}>
                        <RiLogoutBoxRLine /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {data?.isFollowing ? (
                        <button
                          disabled={isFollowLoading}
                          onClick={handleFollow}
                        >
                          {isFollowLoading ? (
                            "Loading.."
                          ) : (
                            <>
                              Unfollow <RiUserUnfollowLine />
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          disabled={isFollowLoading}
                          onClick={handleFollow}
                        >
                          {isFollowLoading ? (
                            "Loading.."
                          ) : (
                            <>
                              Follow <RiUserFollowLine />
                            </>
                          )}
                        </button>
                      )}
                      <button>
                        Contact <RiMailOpenLine />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="main-right">
              <ProfileImageWrapper url="/images/login.jpg">
                <div className="profile-back"></div>
                <div className="profile-image"></div>
              </ProfileImageWrapper>
            </div>
          </ProfileMainWrapper>
          <MoreDataWrapper>
            <div className="sepration"></div>
            <div className="about-head">About</div>
            <div className="about">{data?.data?.about}</div>
            <div className="profiles-section">
              {data?.data?.profiles &&
                data?.data?.profiles?.length > 0 &&
                data?.data?.profiles?.map((item, index) => (
                  <div
                    className="profile"
                    onClick={() => window.open(linkProcessor(item?.link))}
                  >
                    <ProfileIcon platform={item?.platform} />
                  </div>
                ))}
            </div>
          </MoreDataWrapper>
          {/* modals */}
          <FModal show={fmodal} setShow={setFmodal} category={fmodalcat} />
        </>
      )}
    </>
  );
};

export default Profile;
