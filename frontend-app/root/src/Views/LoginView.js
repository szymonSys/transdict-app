import React from "react";
import { Link, Redirect } from "react-router-dom";
import LoginWithFormHandling from "../containers/Login/LoginWithFormHandling";

export default function LoginView() {
  return (
    <div>
      <Link to="/sign-up">sign up</Link>
      <LoginWithFormHandling />
    </div>
  );
}
