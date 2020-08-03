import React from "react";
import AppLogo from "../components/AppLogo";
import LogoutButton from "../components/LogoutButton";

export default function AppBar() {
  return (
    <div>
      <AppLogo />
      <LogoutButton />
    </div>
  );
}
