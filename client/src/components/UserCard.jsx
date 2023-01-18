import React from "react";
import { UserCardWrapper } from "../styles/userCardStyles";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <UserCardWrapper image="/images/login.jpg">
      <Link to={`/users/${user?._id}`}>
        <div className="image-section"></div>

        <div className="data-section">
          <div className="user-name">{user?.username}</div>
          <div className="name">{user?.name}</div>
        </div>
      </Link>
    </UserCardWrapper>
  );
};

export default UserCard;
