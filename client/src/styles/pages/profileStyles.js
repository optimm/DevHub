import styled from "styled-components";
import { backgroundGeneral, flexch, flexcv } from "../globalStyle";

export const ProfileMainWrapper = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  display: flex;
  padding: 0% 6%;
  .main-left {
    width: 50%;
    height: 100%;
  }
  .user-data {
    width: 100%;
    height: 75%;
    margin-top: 14%;
    ${flexcv}
    align-items:flex-start;
    justify-content: space-between;
  }
  .name {
    font-size: 2.4rem;
    font-weight: 700;
    text-transform: capitalize;
  }
  .username {
    margin-top: 10px;
    font-size: 1.4rem;
    font-weight: 600;
  }
  .bio {
    margin-top: 10px;
    font-size: 1.1rem;
    color: var(--text-2);
  }
  .website {
    font-size: 1rem;
    font-weight: 500;
  }
  span {
    font-weight: 700;
  }
  .posts {
    font-size: 1.1rem;
    cursor: pointer;
  }
  .follower-section {
    font-size: 1.1rem;
    margin-top: 15px;
    display: flex;
    gap: 20px;
  }
  .follower-section-sub {
    cursor: pointer;
  }
  .button-inner {
    display: flex;
    gap: 20px;
  }
  button {
    font-size: 1.1rem;
    height: 45px;
    width: 130px;
    gap: 7px;
    border-radius: 5px;
    color: var(--text-white);
    background: var(--primary-color);
  }

  .main-right {
    width: 50%;
    height: 100%;
    ${flexch}
    align-items:flex-start;
  }
  .complete-profile {
    margin-top: 20px;
    font-size: 1.1rem;
    font-weight: 500;
    color: green;
  }
`;
export const ProfileImageWrapper = styled.div`
  width: 55%;
  height: 70%;
  position: relative;
  margin-top: 18%;
  .profile-image {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background: url(${(props) => props.url});
    ${backgroundGeneral}
  }
  .profile-back {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    position: absolute;
    background: var(--primary-color-glass);
    z-index: -1;
    top: -8%;
    left: 15%;
  }
`;

export const MoreDataWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  margin-bottom: 30px;
  padding: 0% 6%;
  .about-head {
    margin-top: 40px;
    font-size: 2.4rem;
    font-weight: 600;
  }
  .about {
    width: 85%;
    margin-top: 20px;
    font-size: 1.1rem;
    color: var(--text-2);
    line-height: 1.4;
  }
  .profiles-section {
    display: flex;
    gap: 25px;
    margin-top: 40px;
  }
  .profile {
    ${flexch}
    height: 40px;
    width: 40px;
    border-radius: 50%;
    font-size: 1.4rem;
    background: var(--primary-color-light);
    color: var(--primary-color);
    cursor: pointer;
  }
  .extra-options {
    display: flex;
    margin-top: 40px;
    gap: 20px;
    justify-content: flex-end;
  }
  .extra-button {
    height: 40px;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 5px;
    width: 200px;
  }
  .delete {
    color: red;
  }
`;
export const LoadingWrapper = styled.div`
  ${flexch}
  height: calc(100vh - 69px);
  font-size: 30px;
  width: 100%;
`;
