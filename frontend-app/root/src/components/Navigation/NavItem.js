import React from "react";
import { Link } from "react-router-dom";

export default function NavItem({ children, linkTo }) {
  return (
    <li>
      <Link to={linkTo}>{children}</Link>
    </li>
  );
}
