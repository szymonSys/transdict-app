import React from "react";
import Translator from "../containers/Translator";
import MainTranslator from "../containers/Translator/MainTranslator";

export default function TranslatorView() {
  return (
    <div>
      <h1>Translator</h1>
      {/* <Translator /> */}
      <MainTranslator />
    </div>
  );
}
