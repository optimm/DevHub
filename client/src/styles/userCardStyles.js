import styled from "styled-components";
import { backgroundGeneral } from "./globalStyle";

export const UserCardWrapper = styled.div`
  height: 280px;
  width: 100%;
  .image-section {
    width: 100%;
    height: 200px;
    background: url(${(props) => props.image});
    ${backgroundGeneral}
  }
  .data-section {
    width: 100%;
    height: 100%;
    padding: 10px 5px;
  }
  .name {
    margin-top: 5px;
    font-size: 14px;
  }
  .user-name {
    font-weight: 600;
    font-size: 18px;
  }
  .user-button {
    margin-top: 5px;
    display: flex;
    gap: 10px;
  }
`;
