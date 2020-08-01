import React from "react";
import Languages from "../../containers/Languages";
import LanguagesList from "../Languages/LanguagesList";

export default function LanguagesWithOneList({
  languages,
  setTranslateValues,
}) {
  return (
    <Languages languages={languages}>
      {({ sortedLanguagesEntries, isOpen, toggleIsOpen }) =>
        isOpen ? (
          <div>
            <button onClick={toggleIsOpen}>close</button>
            <h2>Languages</h2>
            <Languages languages={languages}>
              {({ sortedLanguagesEntries }) => (
                <div>
                  <h3>Translation's language</h3>
                  <LanguagesList
                    setLanguageKey={(key) => setTranslateValues({ to: key })}
                    languagesEntries={sortedLanguagesEntries}
                  />
                </div>
              )}
            </Languages>
          </div>
        ) : (
          <button onClick={toggleIsOpen}>select language</button>
        )
      }
    </Languages>
  );
}
