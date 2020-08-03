import React from "react";
import NavItemsList from "./NavItemsList";
import AppLogo from "../AppLogo";
import { ReactComponent as CloseSVG } from "../../img/svg/001-close.svg";
import { ReactComponent as MenuSVG } from "../../img/svg/002-open-menu.svg";
import {
  StyledMenuBtn,
  StyledNav,
  AppBar,
  StyledMenuCloseBtn,
} from "../../styled-components/Navigation";

export default function NavigationWrapper({
  toggleVisibility,
  transform,
  performTransition,
  navItemsTransitions,
  setNavIsNotVisible,
  isAuthenticated,
}) {
  return (
    <div>
      <AppBar>
        <StyledMenuBtn onClick={toggleVisibility}>
          <MenuSVG />
        </StyledMenuBtn>
        <AppLogo />
      </AppBar>

      {performTransition()}
      <StyledNav
        style={{
          transform,
        }}
      >
        <StyledMenuCloseBtn onClick={toggleVisibility}>
          <CloseSVG />
        </StyledMenuCloseBtn>
        <NavItemsList
          transitions={navItemsTransitions}
          setNavIsNotVisible={setNavIsNotVisible}
          isAuthenticated={isAuthenticated}
        />
      </StyledNav>
    </div>
  );
}
