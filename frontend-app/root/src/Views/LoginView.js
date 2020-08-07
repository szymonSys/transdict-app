import React from "react";
import { Link } from "react-router-dom";
import LoginWithFormHandling from "../containers/Login/LoginWithFormHandling";
import TranslatorWithRedirection from "../containers/Translator/TranslatorWithRedirection";
import TranslatorShortcutWrapper from "../components/Translator/TranslatorShortcutWrapper";

export default function LoginView() {
  return (
    <div style={{ paddingTop: 100 }}>
      <Link to="/sign-up">stwórz konto</Link>
      <LoginWithFormHandling />
      <TranslatorWithRedirection Translator={TranslatorShortcutWrapper} />
    </div>
  );
}
