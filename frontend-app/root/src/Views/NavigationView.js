import React from "react";
import Navigation from "../containers/Navigation";
import NavItemsList from "../components/Navigation/NavItemsList";

export default function NavigationView() {
  return (
    <Navigation>
      <NavItemsList />
    </Navigation>
  );
}
