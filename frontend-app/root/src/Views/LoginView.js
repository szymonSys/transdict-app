import React from "react";
import { Link, useLocation } from "react-router-dom";
import LoginWithFormHandling from "../containers/Login/LoginWithFormHandling";
import TranslatorWithSwitchLanguages from "../containers/Translator/TranslatorWithSwitchLanguages";
import MainTranslatorWrapper from "../components/Translator/MainTranslatorWrapper";

export default function LoginView() {
  const location = useLocation();
  return (
    <div>
      <Link to="/sign-up">sign up</Link>
      <LoginWithFormHandling />
      <TranslatorWithSwitchLanguages Translator={MainTranslatorWrapper} />
    </div>
  );
}
