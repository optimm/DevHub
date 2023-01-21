import styled from "styled-components";
import { backgroundGeneral, flexch } from "./globalStyle";

export const EditWrapper = styled.div`
  width: 100%;
  height: 60vh;
  overflow-y: auto;
`;

export const EditInner = styled.div`
  padding: 10px 20px;
  position: relative;
  .image-section {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .image {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background: url(${(props) => props.url});
    ${backgroundGeneral}
  }
  .text-section {
    height: fit-content;
  }
  .username {
    font-size: 1rem;
    font-weight: 500;
  }
  .edit {
    font-size: 0.9rem;
    cursor: pointer;
    font-weight: 700;
    color: var(--primary-color);
  }
  .text-data-section {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
`;

export const EditForm = styled.form``;

export const Footer = styled.div`
  padding: 0px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .error-text {
    font-size: 0.88rem;
    color: red;
  }
  .submit-button {
    ${flexch}
    font-size: 0.88rem;
    width: 115px;
    height: 35px;
    color: white;
    background: var(--primary-color);

    border-radius: 5px;
  }
`;
