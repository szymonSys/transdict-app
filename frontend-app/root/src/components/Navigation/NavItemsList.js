import React from "react";
import { checkType } from "../../shared/utils";
import {
  StyledNavItemsList,
  StyledNavLink,
  AnimatedButton,
  AnimatedNavItem,
} from "../../styled-components/Navigation";

export default function NavItemsList({
  transitions,
  setNavIsNotVisible,
  isAuthenticated,
}) {
  return (
    <StyledNavItemsList>
      {transitions
        .filter(
          ({ item: { authRequired, onlyForGuest } }) =>
            (!authRequired && !onlyForGuest) ||
            (authRequired && isAuthenticated && !onlyForGuest) ||
            (onlyForGuest && !isAuthenticated)
        )
        .map(
          ({
            item: { type, name, path, action, withoutClose },
            key,
            props,
          }) => {
            if (type === "link")
              return (
                <AnimatedNavItem
                  onClick={setNavIsNotVisible}
                  key={key}
                  style={props}
                >
                  <StyledNavLink exact to={path}>
                    {name}
                  </StyledNavLink>
                </AnimatedNavItem>
              );
            if (type === "button")
              return (
                <AnimatedButton
                  key={key}
                  style={props}
                  onClick={() => {
                    checkType("function", action) && action();
                    !withoutClose && setNavIsNotVisible();
                  }}
                >
                  {name}
                </AnimatedButton>
              );
          }
        )}
    </StyledNavItemsList>
  );
}
