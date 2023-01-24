import styled from "styled-components";
import { flexch, flexcv } from "../globalStyle";

export const MainWrapper = styled.div`
  display: flex;
  padding: 0px 6%;
`;

export const MainLeft = styled.div`
  width: 50%;
`;

export const MainForm = styled.form`
  width: 90%;
  margin: 6% 0px;
  .form-head {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-3);
  }
  .form-questions {
    margin-top: 20px;
    ${flexcv}
    gap:25px;
  }
  .submit-button {
    width: 100%;
    height: 45px;
    background: var(--primary-color);
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }
`;
export const MainRight = styled.div`
  width: 50%;
  height: calc(100vh - 70px);
  ${flexch}
  .image-wrapper {
    height: 40vh;
    width: 75%;
    border: 3px var(--sepration) dashed;
    border-radius: 10px;
  }
`;
