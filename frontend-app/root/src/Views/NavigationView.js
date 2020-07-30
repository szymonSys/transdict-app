import React, { useState, useEffect, useCallback, useRef } from "react";
import Navigation from "../containers/Navigation";
import NavItemsList from "../components/Navigation/NavItemsList";
import MenuButton from "../components/Navigation/MenuButton";

export default function NavigationView(props) {
  return (
    <Navigation>
      <MenuButton />
      <NavItemsList />
    </Navigation>
  );
}
