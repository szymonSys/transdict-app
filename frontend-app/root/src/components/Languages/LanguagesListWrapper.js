import React from "react";
import Language from "../../containers/Languages/Language";
import LanguagesItem from "./LanguagesItem";

export default function ({ languagesEntries, handleClick, checkIsCurrent }) {
  return (
    <ul onClick={handleClick}>
      {languagesEntries.map((entry) => {
        const [key, value] = entry;
        return (
          <Language key={key} languageKey={key} languageName={value?.name}>
            {(setRef) => (
              <LanguagesItem
                isCurrent={checkIsCurrent(value?.name)}
                setRef={setRef}
                language={value?.name}
              />
            )}
          </Language>
        );
      })}
    </ul>
  );
}
