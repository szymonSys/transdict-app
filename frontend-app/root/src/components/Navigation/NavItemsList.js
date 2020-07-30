import React from "react";
import NavItem from "./NavItem";
import styled from "styled-components";
import { animated } from "react-spring";
import { Link } from "react-router-dom";

const NavItems = styled(animated.ul)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 80%;
  font-size: 16;
  font-weight: bold;
  list-style: none;
`;

const StyledNavItem = styled(animated.li)``;

export default function NavItemsList({
  transitions,
  setNavIsNotVisible,
  isAuthenticated,
}) {
  return (
    <NavItems>
      {console.log(transitions)}
      {transitions
        .filter(
          ({ item }) =>
            !item.authRequired || (item.authRequired && isAuthenticated)
        )
        .map(({ item, key, props }) => {
          console.log(
            item.name,
            !item.authRequired || (item.authRequired && isAuthenticated)
          );
          if (item.type === "link")
            return (
              <StyledNavItem
                onClick={setNavIsNotVisible}
                key={key}
                style={props}
              >
                <Link to={item.path}>{item.name}</Link>
              </StyledNavItem>
            );
          if (item.type === "button")
            return (
              <button
                onClick={() => {
                  item.action();
                  setNavIsNotVisible();
                }}
              >
                {item.name}
              </button>
            );
        })}
    </NavItems>
  );
}
