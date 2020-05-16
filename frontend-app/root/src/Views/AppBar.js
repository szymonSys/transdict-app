import React, { useState, useEffect, useCallback, useRef } from "react";
import AppLogo from "../components/AppLogo";
import LogoutButton from "../components/LogoutButton";

export default function AppBar(props) {
  return (
    <div>
      <AppLogo />
      <LogoutButton />
    </div>
  );
}
