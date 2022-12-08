import React from "react";
import { useParams } from "react-router-dom";
import {
  ProfileImageWrapper,
  ProfileMainWrapper,
} from "../styles/profileStyles";

import { RiUserFollowLine, RiMailOpenLine } from "react-icons/ri";

const Profile = () => {
  const { id } = useParams();
  return (
    <ProfileMainWrapper>
      <div className="main-left">
        <div className="user-data">
          <div className="name-section">
            <div className="name">Ayush Saxena</div>
            <div className="bio">
              Hello I am ayush saxena and i am a full stack mern developer, i
              love to create webistes that can be used.
            </div>
          </div>
          <div className="sepration" />
          <div className="numbers-section">
            <div className="posts">
              <span>10</span> Posts
            </div>
            <div className="follower-section">
              <div>
                <span>112</span> Followers
              </div>
              <div>
                <span>50</span> Following
              </div>
            </div>
          </div>
          <div className="sepration" />

          <div className="button-section">
            <button>
              {"Follow "} <RiUserFollowLine />
            </button>
            <button>
              {"Contact "} <RiMailOpenLine />
            </button>
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
  );
};

export default Profile;
