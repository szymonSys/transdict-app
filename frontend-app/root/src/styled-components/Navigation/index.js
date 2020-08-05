import styled from "styled-components";
import { colors, fontSizes } from "../stylesValues";
import { animated } from "react-spring";
import { NavLink } from "react-router-dom";

const { mainBlue, mainPurple } = colors;
const { xxl } = fontSizes;

export const StyledAppLogo = styled.p`
  position: absolute;
  left: 50%;
  top: 20px;
  color: ${mainBlue};
  font-family: "Montserrat", sans-serif;
  font-size: ${xxl};
  background-color: transparent;
  font-weight: 700;
  transform: translate(-40%, -10%);
  overflow: hidden;
  @media (min-width: 420px) {
    transform: translate(-50%, -10%);
  }
`;

export const AppBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 20px;
  z-index: 100;
  background-color: #eeeeee;
  @media (min-width: 420px) {
  }
`;

export const StyledMenuBtn = styled(animated.button)`
  position: absolute;
  left: 10px;
  top: 20px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  z-index: 2;
  & > svg {
    width: 100%;
    min-width: 30px;
  }

  @media (min-width: 420px) {
    left: 20px;
  }
`;

export const StyledMenuCloseBtn = styled(StyledMenuBtn)`
  position: absolute;
  left: auto;
  right: 20px;
  top: 20px;
  z-index: 99;
  @media (min-width: 420px) {
    left: auto;
  }
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
  z-index: 0;
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
`;

export const AnimatedNavItem = styled(animated.li)``;

export const AnimatedButton = styled(animated.button)``;

const activeClassName = "nav-item-active";

export const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: ${mainPurple};
    font-size: 22px;
    font-weight: 700;
  }
  color: #555555;
  font-weight: 600;
`;
