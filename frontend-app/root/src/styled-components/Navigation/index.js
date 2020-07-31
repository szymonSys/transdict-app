import styled from "styled-components";
import { animated } from "react-spring";
import { NavLink } from "react-router-dom";

export const StyledMenuBtn = styled(animated.button)`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 60px;
  height: 25px;
  z-index: 99;
`;

export const StyledNav = styled(animated.nav)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 200px;
  max-width: 100vw;
  width: 35vh;
  height: 100vh;
  margin: 0;
  background-color: white;
  z-index: 11;
`;

export const StyledNavBackground = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -1;
`;

export const StyledNavItemsList = styled(animated.ul)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  width: 100%;
  height: 80%;
  font-size: 20px;
  margin: 0 50px 0 0;
  font-weight: bold;
  list-style: none;
`;

export const AnimatedNavItem = styled(animated.li)``;

export const AnimatedButton = styled(animated.button)``;

const activeClassName = "nav-item-active";

export const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: purple;
    font-size: 22px;
    font-weight: 700;
  }
  text-decoration: none;
  color: #555555;
  font-weight: 600;
`;
