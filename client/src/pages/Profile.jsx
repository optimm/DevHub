import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LoadingWrapper,
  MoreDataWrapper,
  ProfileImageWrapper,
  ProfileMainWrapper,
} from "../styles/pages/profileStyles";
import {
  RiUserFollowLine,
  RiMailOpenLine,
  RiUserUnfollowLine,
  RiEditFill,
  RiLogoutBoxRLine,
} from "react-icons/ri";

import {
  useFollowUserMutation,
  useGetSingleUserQuery,
} from "../app/services/userApi";
import { useLogoutQuery } from "../app/services/authApi";
import { createNotification } from "../components/Notification";
import { useSelector } from "react-redux";
import FModal from "../components/FModal";
import EditProfileModal from "../components/EditProfileModal";
import ProfileIcon from "../components/ProfileIcon";
import { linkProcessor } from "../util/utilFunctions";
import ChangePassword from "../components/ChangePassword";
import DeleteAccount from "../components/DeleteAccount";
import { AiOutlinePlus } from "react-icons/ai";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isAuthenticated } = useSelector((state) => state.me);
  const [skip, setSkip] = useState(true);
  const [blankLoader, setBlankLoader] = useState(true);
  //modals
  const [fmodal, setFmodal] = useState(false);
  const [fmodalcat, setFmodalCat] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [changep, setChangep] = useState(false);
  const [del, setDel] = useState(false);
  //
  const [complete, setComplete] = useState(false);
  //queries
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetSingleUserQuery({
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
    if (isFetching) {
      setBlankLoader(true);
    } else if (!isFetching && data?.success) {
      let tdata = data?.data;
      if (
        !tdata?.about ||
        tdata.about === "" ||
        !tdata?.bio ||
        tdata?.bio === "" ||
        !tdata?.profiles ||
        tdata?.profiles.length == 0
      ) {
        setComplete(false);
      } else {
        setComplete(true);
      }
      setTimeout(() => {
        setBlankLoader(false);
      }, 500);
    }
  }, [isFetching]);

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
      {isLoading || isFetching || blankLoader ? (
        <LoadingWrapper>Loading...</LoadingWrapper>
      ) : (
        <>
          <ProfileMainWrapper>
            <div className="main-left">
              <div className="user-data">
                <div className="name-section">
                  <div className="name">{data?.data?.name}</div>
                  <div className="username">{data?.data?.username}</div>
                  <div className="bio">{data?.data?.bio}</div>
                  {/* <a className="website" href={linkProcessor("google.com")}>
                    Website
                  </a> */}
                </div>
                <div className="sepration" />
                <div className="numbers-section">
                  <div className="posts">
                    <div>
                      <span>{data?.data?.total_projects}</span> Projects
                    </div>
                    {data?.isMe && (
                      <div
                        className="add-project"
                        onClick={() => navigate("/projects/add")}
                      >
                        Add <AiOutlinePlus />
                      </div>
                    )}
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
                  <div className="button-inner">
                    {data?.isMe ? (
                      <>
                        <button onClick={() => setEditProfile(true)}>
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

                  <div className="complete-profile">
                    {!complete &&
                      data?.isMe &&
                      "Complete your profile so that other's can know you better"}
                    {complete &&
                      data?.data?.profiles?.length < 6 &&
                      data?.isMe &&
                      "Add more profile links to be more reachable"}
                  </div>
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
                    key={index}
                    onClick={() => window.open(linkProcessor(item?.link, 20))}
                  >
                    <ProfileIcon platform={item?.platform} />
                  </div>
                ))}
            </div>
            {data?.isMe && (
              <div className="extra-options">
                <button
                  className="extra-button"
                  onClick={() => setChangep(true)}
                >
                  Change Password
                </button>
                <button
                  className="extra-button delete"
                  onClick={() => setDel(true)}
                >
                  Delete Account
                </button>
              </div>
            )}
          </MoreDataWrapper>

          <FModal show={fmodal} setShow={setFmodal} category={fmodalcat} />
          {editProfile && (
            <EditProfileModal show={editProfile} setShow={setEditProfile} />
          )}
          {changep && <ChangePassword show={changep} setShow={setChangep} />}
          {del && <DeleteAccount show={del} setShow={setDel} />}
        </>
      )}
    </>
  );
};

export default Profile;
