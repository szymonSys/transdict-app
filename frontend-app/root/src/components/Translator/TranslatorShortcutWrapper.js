import React from "react";
import LanguagesWithOneList from "../Languages/LanguagesWithOneList";

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
      <h5>to: {currentLanguage}</h5>
      <textarea onChange={handleChange} value={phrase} />
      <span>{isLoading && "Loading..."}</span>
      <LanguagesWithOneList
        languages={languages}
        setTranslateValues={setTranslateValues}
      />
    </div>
  );
}
