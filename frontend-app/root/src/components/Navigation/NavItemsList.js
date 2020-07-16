import React from "react";
import NavItem from "./NavItem";

export default function NavItemsList({ transitions }) {
  return (
    <ul>
      <NavItem linkTo="/">Main View</NavItem>
      <NavItem linkTo="/translator">Translator</NavItem>
      <NavItem linkTo="/collections">Collections</NavItem>
    </ul>
  );
}
