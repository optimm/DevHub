import React, { useEffect, useState } from "react";
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
import { useGetSingleUserQuery } from "../app/services/userApi";
import { useLogoutQuery } from "../app/services/authApi";
import { createNotification } from "../components/Notification";
import { linkProcessor } from "../util/linkProcessor";

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
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetSingleUserQuery({ id });

  const [skip, setSkip] = useState(true);
  const { isError: isLogoutError, isSuccess: isLogoutSuccess } = useLogoutQuery(
    "",
    { skip }
  );

  useEffect(() => {
    if (isLogoutError) {
      createNotification(`Something went wrong`, "error", 2000);
    } else if (isLogoutSuccess) {
      createNotification(`Logged out successfully`, "success", 2000);
      navigate("/");
    }
  }, [isLogoutError, isLogoutSuccess]);

  const handleLogout = () => {
    setSkip(false);
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
                    <div>
                      <span>{data?.data?.total_followers}</span> Followers
                    </div>
                    <div>
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
                        <button>
                          Unfollow <RiUserUnfollowLine />
                        </button>
                      ) : (
                        <button>
                          Follow <RiUserFollowLine />
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
        </>
      )}
    </>
  );
};

export default Profile;
