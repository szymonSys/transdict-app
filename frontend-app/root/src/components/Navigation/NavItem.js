import React from "react";
import {
  Redirect,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

export default function NavItem({ children, linkTo }) {
  return (
    <li>
      <Link to={linkTo}>{children}</Link>
    </li>
  );
}
