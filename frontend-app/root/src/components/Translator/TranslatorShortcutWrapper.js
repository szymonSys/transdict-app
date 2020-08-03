import React from "react";
import LanguagesWithOneList from "../Languages/LanguagesWithOneList";
import { StyledTranslatorShortcutWrapper } from "../../styled-components/Translator";
import { ReactComponent as ReverseSVG } from "../../img/svg/018-sort.svg";

export default function TranslatorShortcutWrapper({
  phrase,
  isLoading,
  languages,
  handleChange,
  currentLanguage,
  setTranslateValues,
}) {
  return (
    <div>
      <h5>{currentLanguage}</h5>
      <textarea onChange={handleChange} value={phrase} />
      <span>{isLoading && "Loading..."}</span>
      <LanguagesWithOneList
        languages={languages}
        setTranslateValues={setTranslateValues}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
