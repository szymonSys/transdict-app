import React from "react";

import LanguagesWithTwoLists from "../../components/Languages/LanguagesWithTwoLists";

export default function TranslatorWrapperWithAdding({
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

  const { phrase, translation, from, to } = translateValues;

  return (
    <div>
      <h4>from: {languageOutputFrom}</h4>
      <h4>to: {languageOutputTo}</h4>
      <textarea onChange={handleChange} value={phrase} />
      <button onClick={handleReverse}>reverse</button>
      <textarea
        disabled="disabled"
        value={isLoading ? "Loading..." : phrase ? translation : ""}
      />

      <h2>Languages</h2>
      <LanguagesWithTwoLists
        languages={languages}
        setCurrentLanguages={setCurrentLanguages}
        handleSetAutoTranslation={handleSetAutoTranslation}
        setTranslateValues={setTranslateValues}
      />
    </div>
  );
}
