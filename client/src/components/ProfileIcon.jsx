import React from "react";
import {
  AiFillInstagram,
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillRedditCircle,
} from "react-icons/ai";

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
  if (platform === "reddit") {
    return <AiFillRedditCircle />;
  }
};

export default ProfileIcon;
