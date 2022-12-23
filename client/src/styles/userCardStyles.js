import styled from "styled-components";
import { backgroundGeneral } from "./globalStyle";

export const UserCardWrapper = styled.div`
  height: 280px;
  width: 100%;
  // background: var(--primary-color-light);
  .image-section {
    width: 100%;
    height: 200px;
    background: url(${(props) => props.image});
    ${backgroundGeneral}
  }
  .data-section {
    width: 100%;
    height: 100%;
    padding: 10px 0px;
  }
  .user-name {
    font-size: 16px;
  }
  .user-button {
    margin-top: 5px;
    display: flex;
    gap: 10px;
  }
`;
