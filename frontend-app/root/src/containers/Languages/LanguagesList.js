import React from "react";
import LanguagesListWrapper from "../../components/Languages/LanguagesListWrapper";
import { checkType } from "../../shared/utils";

export default function LanguagesList({
  languagesEntries,
  setLanguageKey,
  setLanguageName,
  which,
  currentLanguage,
}) {
  const setLanguage = (event) => {
    if (
      event.target.dataset?.languageName &&
      checkType("function", setLanguageName) &&
      (which === 1 || which === 2)
    )
      setLanguageName(event.target.dataset.languageName, which);
    if (event.target.dataset?.languageKey)
      setLanguageKey(event.target.dataset?.languageKey);
  };

  const checkIsCurrent = (language) => language === currentLanguage;

  return (
    <LanguagesListWrapper
      languagesEntries={languagesEntries}
      handleClick={setLanguage}
      checkIsCurrent={checkIsCurrent}
    />
  );
}
