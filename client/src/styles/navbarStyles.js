import styled from "styled-components";
import { flexch } from "./globalStyle";

export const NavContainerMain = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 5%;
  height: 70px;
  width: 100%;
  background: var(--primary-color);
  opacity: 95%;
  gap: 2.5%;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-right: 20px;
  color: var(--text-white);
`;

export const NavContainerRight = styled.div`
  ${flexch}
  gap:1.5vw;
  margin-left: auto;
`;

export const Item = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-white-light);
  transition: all 0.1s ease;
  &:hover {
    color: var(--text-white);
  }
`;

export const NavButton = styled.button`
  height: 35px;
  width: 100px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-white-light);
  background: var(--glassmorph);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: var(--glassmorph-dark);
    color: var(--text-white);
  }
`;
