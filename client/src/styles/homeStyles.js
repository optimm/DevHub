import styled from "styled-components";
import { backgroundGeneral, flexcv } from "./globalStyle";

export const LandingContainer = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  background: url(${(props) => props.url});
  ${backgroundGeneral}
`;

export const LandingOverlay = styled.div`
  ${flexcv}
  justify-content:flex-start;
  width: 100%;
  height: 100%;
  padding: 10% 20% 0 20%;
  background: rgb(0, 0, 0, 0.7);
  color: var(--text-white);
  .text-main {
    font-size: clamp(40px, 5vw, 5vw);
  }
  .text-main-span {
    font-family: "Zen Dots", cursive;
  }
  .text-sub {
    margin-top: 4%;
    font-size: clamp(16px, 1.4vw, 1.4vw);
    font-weight: 500;
    text-align: center;
  }
  .button-container {
    display: flex;
    gap: 20px;
    margin-top: 7%;
  }
  .button-main {
    height: 50px;
    width: 220px;
    border-radius: 5px;
    font-size: clamp(16px, 1.4vw, 1.4vw);
    background: var(--glass-morph);
    color: var(--text-white);
    transition: all 0.5s ease;
    &:hover {
      background: white;
      color: var(--primary-color);
    }
  }
`;
