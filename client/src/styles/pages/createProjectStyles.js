import styled from "styled-components";
import { flexch } from "../globalStyle";

export const MainWrapper = styled.div`
  display: flex;
`;

export const MainLeft = styled.div`
  width: 50%;
`;
export const MainRight = styled.div`
  width: 50%;
  height: calc(100vh - 70px);
  ${flexch}
  .image-wrapper {
    height: 50vh;
    width: 70%;
    border: 3px var(--sepration) dashed;
    border-radius: 10px;
  }
`;
