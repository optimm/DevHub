import React from "react";
import { UserCardWrapper } from "../styles/userCardStyles";

const UserCard = () => {
  return (
    <UserCardWrapper image="/images/login.jpg">
      <div className="image-section"></div>
      <div className="data-section">
        <div className="user-name">Ayush Saxena</div>
      </div>
    </UserCardWrapper>
  );
};

export default UserCard;
