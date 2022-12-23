import React from "react";
import { useParams } from "react-router-dom";
import {
  ProfileImageWrapper,
  ProfileMainWrapper,
} from "../styles/profileStyles";

import {
  RiUserFollowLine,
  RiMailOpenLine,
  RiUserUnfollowLine,
  RiEditFill,
} from "react-icons/ri";
import { useGetSingleUserQuery } from "../app/services/userApi";

const Profile = () => {
  const { id } = useParams();
  const { data, isError, isSuccess, isLoading, isFetching } =
    useGetSingleUserQuery({ id });

  return (
    <>
      {isLoading || isFetching ? (
        <>Loading</>
      ) : (
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
                  <button>
                    <RiEditFill /> Profile
                  </button>
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
      )}
    </>
  );
};

export default Profile;
