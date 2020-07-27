import React from "react";
import Languages from "../../containers/Languages";
import LanguagesList from "../../components/Languages/LanguagesList";

export default function MainTranslatorWrapper({
  children,
  translateValues,
  isLoading,
  languages,
  handleChange,
  handleReverse,
  handleSetAutoTranslation,
  setCurrentLanguagesOutput,
  setCurrentLanguages,
  setTranslateValues,
}) {
  const [languageOutputFrom, languageOutputTo] = setCurrentLanguagesOutput();
  return (
    <div>
      <h4>from: {languageOutputFrom}</h4>
      <h4>to: {languageOutputTo}</h4>
      <textarea onChange={handleChange} value={translateValues.phrase} />
      <button onClick={handleReverse}>reverse</button>
      <textarea
        disabled="disabled"
        value={
          isLoading
            ? "Loading..."
            : translateValues.phrase
            ? translateValues.translation
            : ""
        }
      />

      <h2>Languages</h2>
      <Languages languages={languages}>
        {({ sortedLanguagesEntries }) => (
          <div>
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
    </div>
  );
}
