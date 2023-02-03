import styled from "styled-components";
import { flexcv } from "../globalStyle";

export const FullScreenLoaders = styled.div`
  ${flexcv}
  gap:30px;
  height: 100vh;
  width: 100vw;
  .image {
    height: 35vh;
  }
  .text {
    font-size: 4rem;
    font-weight: 800;
    text-align: center;
    color: var(--text-2);
    font-family: "Zen Dots", cursive;
  }
  span {
    font-size: 6rem;
    color: var(--primary-color);
  }
`;

export const AllUsersProjectsLoaders = styled.div`
  height: calc(90vh - 220px);
  width: 100%;
  ${flexcv}
`;
