import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Item,
  Logo,
  NavButton,
  NavContainerMain,
  NavContainerRight,
} from "../styles/navbarStyles";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.me);
  return (
    <NavContainerMain>
      <Logo>
        <Link to="/">DevHub</Link>
      </Logo>
      <Item>
        <Link to="/">Projects</Link>
      </Item>
      <Item>
        <Link to="/">Developers</Link>
      </Item>
      <Item>
        <Link to="/about">About</Link>
      </Item>
      <NavContainerRight>
        {isAuthenticated ? (
          <Avatar sx={{ width: 35, height: 35 }} />
        ) : (
          <>
            <Item>
              <Link to="/login">Login</Link>
            </Item>
            <Link to="/register">
              <NavButton>Register</NavButton>
            </Link>
          </>
        )}
      </NavContainerRight>
    </NavContainerMain>
  );
};

export default Navbar;
