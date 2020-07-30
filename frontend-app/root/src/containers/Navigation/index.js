import React, { useState, useCallback, useRef } from "react";
import NavItemsList from "../../components/Navigation/NavItemsList";
import MenuButton from "../../components/Navigation/MenuButton";
import { useParams } from "react-router-dom";
import { useTransition, useSpring, animated, useChain } from "react-spring";
import { connect } from "react-redux";
import styled from "styled-components";

const MenuBtn = styled(animated.button)`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 60px;
  height: 25px;
  z-index: 99;
`;

const StyledNav = styled(animated.nav)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100vh;
  margin: 0;
  background-color: white;
  z-index: 11;
`;

const NavBackground = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -1;
`;

const items = [
  {
    type: "link",
    key: "translator-link",
    name: "Translator",
    path: "/translator",
  },
  {
    type: "link",
    key: "collections-link",
    name: "Collections",
    path: "/collections",
    authRequired: true,
  },
  { type: "link", key: "login-link", name: "Log In", path: "/login" },
  {
    type: "button",
    action: () => console.log("action"),
    key: "add-colleciot-link",
    name: "Dodaj kolekcje",
    authRequired: false,
  },
];

function Navigation({ children, isAuthenticated }) {
  const [navIsVisible, setVisibility] = useState(false);

  const onClick = useCallback(() => setVisibility((state) => !state), []);

  const transRef = useRef();
  const springRef = useRef();
  const trans2Ref = useRef();

  const { transform, backgroundColor } = useSpring({
    ref: springRef,
    from: {
      transform: "translate3d(-100%,0,0)",
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    to: {
      transform: navIsVisible
        ? "translate3d(0%,0,0)"
        : "translate3d(-100%,0,0)",
      backgroundColor: navIsVisible ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0)",
    },
  });

  const navItemsTranslations = useTransition(
    navIsVisible ? items : [],
    (item) => item.key,
    {
      ref: transRef,
      trail: 200 / items.length,
      unique: true,
      from: {
        opacity: 0,
        transform: "translate3d(-100%,0,0)",
      },
      enter: {
        opacity: 1,
        transform: "translate3d(0%,0,0)",
      },
      leave: {
        opacity: 0,
        transform: "translate3d(-100%,0,0)",
      },
    }
  );

  const backgroundTransitions = useTransition(
    navIsVisible ? [{ key: "background-nav" }] : [],
    (item) => item.key,
    {
      ref: trans2Ref,
      unique: true,
      from: {
        zIndex: 0,
      },
      enter: {
        zIndex: 1,
      },
      leave: {
        zIndex: 0,
      },
    }
  );

  useChain(
    navIsVisible
      ? [trans2Ref, springRef, transRef]
      : [transRef, springRef, trans2Ref],
    [0, navIsVisible ? 0 : 0.1, navIsVisible ? 0.2 : 0.1]
  );

  const performTransition = (transitions) => {
    if (!transitions || !transitions.length) return;
    const [transition] = transitions;
    const { props, key } = transition;
    return (
      <NavBackground
        key={key}
        style={{ backgroundColor, ...props }}
      ></NavBackground>
    );
  };

  return (
    <div>
      <button onClick={onClick}>show</button>
      {/* {backgroundTransitions.map(({ props, key }) => (
        <NavBackground
          key={key}
          style={{ backgroundColor, ...props }}
        ></NavBackground>
      ))} */}
      {performTransition(backgroundTransitions)}
      <StyledNav
        style={{
          transform,
        }}
      >
        <MenuBtn onClick={onClick}>hide</MenuBtn>
        <NavItemsList
          transitions={navItemsTranslations}
          setNavIsNotVisible={() => setVisibility(false)}
          isAuthenticated={isAuthenticated}
        />
      </StyledNav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navigation);
