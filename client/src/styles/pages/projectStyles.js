import styled from "styled-components";
import { backgroundGeneral, flexch, flexcv } from "../globalStyle";

export const ProjectMainWrapper = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  display: flex;
  padding: 0% 6%;

  .main-left {
    width: 50%;
    height: 100%;
  }
  .data-wrapper {
    margin-top: 8%;
  }
  .profile-section {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .username {
    font-size: 1rem;
    font-weight: 600;
  }
  .created-at {
    font-size: 0.88rem;
  }

  .title {
    margin-top: 30px;
    font-size: 1.5rem;
    font-weight: 700;
    width: 90%;
    line-height: 1.2;
  }

  .desc {
    margin-top: 15px;
    font-size: 1.1rem;
    width: 90%;
    line-height: 1.2;
  }

  .likes-data {
    font-weight: 600;
    cursor: pointer;
  }

  .tags-section {
    margin-top: 15px;
  }
  .tags-head {
    font-weight: 600;
    font-size: 1.3rem;
  }
  .tags {
    margin-top: 5px;
  }
  .main-right {
    width: 50%;
    height: 100%;
    ${flexcv}
    align-items:flex-start;
    margin-left: 5%;
  }
  .likes-section {
    margin-top: 20px;
    display: flex;
    gap: 30px;
  }
  .likes-indv {
    font-size: 1.6rem;
    color: var(--text-2);
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
`;

export const ProjectImageWrapper = styled.div`
  width: 92%;
  height: 60%;
  position: relative;
  margin-top: 8%;

  .project-image {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background: url(${(props) => props.url});
    ${backgroundGeneral}
  }
  .project-back {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    position: absolute;
    background: var(--primary-color-glass);
    z-index: -1;
    top: -12%;
    left: 8%;
  }
`;
