import React from "react";
import TranslatorWithSwitchLanguages from "../containers/Translator/TranslatorWithSwitchLanguages";
import MainTranslatorWrapper from "../components/Translator/MainTranslatorWrapper";

export default function TranslatorView() {
  return (
    <div>
      <h1>Translator</h1>
      <TranslatorWithSwitchLanguages Translator={MainTranslatorWrapper} />
    </div>
  );
}
