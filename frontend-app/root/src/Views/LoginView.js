import React from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import LoginWithFormHandling from "../containers/Login/LoginWithFormHandling";

export default function LoginView() {
  const location = useLocation();
  return (
    <div>
      <Link to="/sign-up">sign up</Link>
      <LoginWithFormHandling />
    </div>
  );
}
