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

export default function NavItem({ children, path }) {
  return (
    <li>
      <Link>{children}</Link>
    </li>
  );
}
