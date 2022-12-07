import styled from "styled-components";
import { flexcv } from "./globalStyle";

export const MainWrapper = styled.div`
  ${flexcv}
  height: 100vh;
  width: 100vw;
  background: var(--primary-color-light);
`;

export const MainCard = styled.div`
  height: 450px;
  width: 800px;
  background: white;
  margin: auto;
  display: flex;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 15%),
    0px 1px 1px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%);
  border-radius: 5px;
`;

export const MainCardForm = styled.div`
  height: 100%;
  flex: 1;
`;

export const MainCardImage = styled.div`
  height: 100%;
  flex: 1;
  background: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
`;

export const MainCardOverLay = styled.div`
  height: 100%;
  width: 100%;
  background: var(--primary-color);
  opacity: 70%;
`;
