import React, { useState, useCallback, useRef } from "react";
import NavItemsList from "../../components/Navigation/NavItemsList";
import { useTransition, useSpring, useChain } from "react-spring";
import { connect } from "react-redux";
import store from "../../store";
import { logout } from "../../actions/auth";
import { StyledNavBackground } from "../../styled-components/Navigation";
import NavigationWrapper from "../../components/Navigation/NavigationWrapper";

const navItems = [
  // {
  //   type: "button",
  //   action: () => console.log("action"),
  //   key: "add-colleciot-button",
  //   name: "Dodaj kolekcje",
  //   authRequired: true,
  //   withoutClose: true,
  // },
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
  {
    type: "link",
    key: "login-link",
    name: "Log in",
    path: "/login",
    onlyForGuest: true,
  },
  {
    type: "link",
    key: "signup-link",
    name: "Sign up",
    path: "/sign-up",
    onlyForGuest: true,
  },
  {
    type: "button",
    action: () => store.dispatch(logout()),
    key: "loggout-button",
    name: "Log out",
    authRequired: true,
  },
];

function Navigation({ isAuthenticated }) {
  const [navIsVisible, setVisibility] = useState(false);

  const toggleVisibility = useCallback(
    () => setVisibility((state) => !state),
    []
  );

  const setNavIsNotVisible = () => navIsVisible && setVisibility(false);

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

  const navItemsTransitions = useTransition(
    navIsVisible ? navItems : [],
    (item) => item.key,
    {
      ref: transRef,
      trail: 200 / navItems.length,
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
        zIndex: 1,
      },
      enter: {
        zIndex: 2,
      },
      leave: {
        zIndex: 1,
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
      <StyledNavBackground
        onClick={setNavIsNotVisible}
        key={key}
        style={{ backgroundColor, ...props }}
      />
    );
  };

  return (
    <NavigationWrapper
      toggleVisibility={toggleVisibility}
      transform={transform}
      performTransition={() => performTransition(backgroundTransitions)}
      navItemsTransitions={navItemsTransitions}
      setNavIsNotVisible={setNavIsNotVisible}
      isAuthenticated={isAuthenticated}
    />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navigation);
