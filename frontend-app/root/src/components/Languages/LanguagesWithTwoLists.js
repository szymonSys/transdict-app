import React from "react";
import Languages from "../../containers/Languages";
import LanguagesList from "../Languages/LanguagesList";

export default function LanguagesWithTwoLists({
  languages,
  setCurrentLanguages,
  setTranslateValues,
  handleSetAutoTranslation,
}) {
  return (
    <Languages languages={languages}>
      {({ sortedLanguagesEntries }) => (
        <div>
          <h2>Languages</h2>
          <h3>Phrase's language</h3>
          <button onClick={handleSetAutoTranslation}>Wykryj język</button>
          <LanguagesList
            setLanguageName={setCurrentLanguages}
            setLanguageKey={(key) => setTranslateValues({ from: key })}
            languagesEntries={sortedLanguagesEntries}
            which={1}
          />
          <h3>Translation's language</h3>
          <LanguagesList
            setLanguageName={setCurrentLanguages}
            setLanguageKey={(key) => setTranslateValues({ to: key })}
            languagesEntries={sortedLanguagesEntries}
            which={2}
          />
        </div>
      )}
    </Languages>
  );
}
