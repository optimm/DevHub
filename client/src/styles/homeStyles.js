import styled from "styled-components";
import { backgroundGeneral } from "./globalStyle";

export const LandingContainer = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  background: url(${(props) => props.url});
  ${backgroundGeneral}
`;

export const LandingOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: var(--primary-color-glass);
`;
