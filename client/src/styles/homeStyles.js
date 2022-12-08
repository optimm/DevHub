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
  align-items:flex-start;
  padding: 0% 6%;
  width: 100%;
  height: 100%;
  background: var(--back-drop);
  color: var(--text-white);

  .text-main {
    font-size: clamp(40px, 5vw, 5vw);
  }
  .text-main-span {
    font-family: "Zen Dots", cursive;
  }
  .text-sub {
    margin-top: 4%;
    font-size: clamp(16px, 1.5vw, 1.5vw);
    font-weight: 500;
    width: 52%;
  }
  .button-container {
    display: flex;
    gap: 20px;
    margin-top: 5%;
  }
  .button-main {
    height: 55px;
    width: 230px;
    border-radius: 5px;
    font-size: clamp(16px, 1.5vw, 1.5vw);
    background: var(--glass-morph);
    color: var(--text-white);
    transition: all 0.5s ease;
    &:hover {
      background: white;
      color: var(--primary-color);
    }
  }
`;
