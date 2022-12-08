import styled from "styled-components";
import { backgroundGeneral, flexch, flexcv } from "./globalStyle";

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
    height: 65%;
    margin-top: 18%;
    ${flexcv}
    align-items:flex-start;
    justify-content: space-between;
  }
  .name {
    font-size: 2.5rem;
    font-weight: 700;
  }
  .bio {
    margin-top: 15px;
    width: 75%;
    font-size: 1.2rem;
    color: var(--text-2);
  }
  span {
    font-weight: 700;
  }
  .posts {
    font-size: 1.1rem;
  }
  .follower-section {
    font-size: 1.1rem;
    margin-top: 15px;
    display: flex;
    gap: 20px;
  }
  .button-section {
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
`;
export const ProfileImageWrapper = styled.div`
  width: 55%;
  height: 65%;
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
    top: -10%;
    left: 10%;
  }
`;
