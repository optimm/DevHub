import styled from "styled-components";
import { backgroundGeneral, flexcv } from "./globalStyle";

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

export const MainCardForm = styled.form`
  height: 100%;
  width: 50%;
  padding: 50px 40px 10px 40px;
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${(props) => (props.login ? "30px" : "25px")};
  }
  .form-head {
    font-size: 25px;
    font-weight: 700;
    color: var(--text-3);
    margin-top: ${(props) => props.login && "10px"};
  }
  .form-button {
    height: 35px;
    width: 150px;
    background: var(--primary-color);
    color: white;
    font-size: 14px;
    font-weight: 600;
  }

  .MuiFormHelperText-root {
    font-size: 11px;
  }
`;

export const MainCardImage = styled.div`
  height: 100%;
  width: 50%;
  background: url(${(props) => props.url});
  ${backgroundGeneral}
`;

export const MainCardOverLay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  height: 100%;
  width: 100%;
  background: var(--primary-color-glass);
  padding: 50px 40px;
  .heading {
    font-size: 35px;
    font-weight: 700;
    color: var(--text-white);
  }
  .text {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-white);
  }
  .card-button {
    height: 35px;
    width: 150px;
    background: white;
    color: var(--primary-color);
    font-size: 14px;
    font-weight: 600;
  }
`;
