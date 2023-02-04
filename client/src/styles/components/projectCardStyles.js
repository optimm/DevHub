import styled from "styled-components";
import { backgroundGeneral, flexch, flexcv } from "../globalStyle";

export const ProjectCardWrapper = styled.div`
  height: 234px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 0px 0px 5px 5px;
  cursor: pointer;

  .image-section {
    width: 100%;
    height: 180px;
    background: url(${(props) => props.image});
    ${backgroundGeneral}
    position:relative;
  }
  .image-overlay {
    display: none;
    animation: fadeIn 0.5s ease;
  }
  &:hover .image-overlay {
    ${flexch}
    background: var(--back-drop);
    position: absolute;
    color: white;
    height: 100%;
    width: 100%;
  }

  .data-section {
    width: 100%;
    padding: 12px 10px;
  }
  .title {
    text-align: center;
    width: 85%;
    line-height: 1.2;
    font-size: 1rem;
    font-weight: 500;
  }
  .likes-comments {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
  }
  .likes-left {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .likes-left .MuiAvatar-root {
    font-size: 0.88rem;
  }
  .username {
    font-weight: 500;
  }
  .likes-right {
    display: flex;
    gap: 15px;
  }
  .like-indv {
    ${flexch}
    gap:5px;
    color: var(--text-2);
  }
`;
