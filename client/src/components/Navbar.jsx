import React from "react";
import { Link } from "react-router-dom";
import {
  Item,
  Logo,
  NavButton,
  NavContainerMain,
  NavContainerRight,
} from "../styles/navbarStyles";

const Navbar = () => {
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
        <Link to="/login">
          <NavButton>Login</NavButton>
        </Link>
        <Link to="/register">
          <NavButton>Register</NavButton>
        </Link>
      </NavContainerRight>
    </NavContainerMain>
  );
};

export default Navbar;
