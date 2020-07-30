import React from "react";
import { Link, useLocation } from "react-router-dom";
import LoginWithFormHandling from "../containers/Login/LoginWithFormHandling";
import TranslatorWithRedirection from "../containers/Translator/TranslatorWithRedirection";
import TranslatorShortcutWrapper from "../components/Translator/TranslatorShortcutWrapper";

export default function LoginView() {
  const location = useLocation();
  return (
    <div>
      <Link to="/sign-up">sign up</Link>
      <LoginWithFormHandling />
      <TranslatorWithRedirection Translator={TranslatorShortcutWrapper} />
    </div>
  );
}
