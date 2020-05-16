import React from "react";
import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

export default function Navigation({ children }) {
  return <nav>{children}</nav>;
}
