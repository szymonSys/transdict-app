import React from "react";
import Language from "../../containers/Languages/Language";
import LanguagesItem from "./LanguagesItem";
import { checkType } from "../../shared/utils";

export default function LanguagesList({
  languagesEntries,
  setLanguageKey,
  setLanguageName,
  which,
}) {
  const handleClick = (event) => {
    if (
      event.target.dataset?.languageName &&
      checkType("function", setLanguageName) &&
      (which === 1 || which === 2)
    )
      setLanguageName(event.target.dataset.languageName, which);
    if (event.target.dataset?.languageKey)
      setLanguageKey(event.target.dataset?.languageKey);
  };

  return (
    <ul onClick={handleClick}>
      {languagesEntries.map((entry) => {
        const [key, value] = entry;
        return (
          <Language key={key} languageKey={key} languageName={value?.name}>
            {(setRef) => (
              <LanguagesItem setRef={setRef} language={value?.name} />
            )}
          </Language>
        );
      })}
    </ul>
  );
}
