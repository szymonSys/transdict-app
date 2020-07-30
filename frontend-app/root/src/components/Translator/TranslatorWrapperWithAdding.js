import React from "react";
import LanguagesWithTwoLists from "../../components/Languages/LanguagesWithTwoLists";
import AddToCollection from "../../containers/Translations/AddToCollection";

export default function TranslatorWrapperWithAdding({
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

  const { phrase, translation } = translateValues;

  return (
    <div>
      <h4>from: {languageOutputFrom}</h4>
      <h4>to: {languageOutputTo}</h4>
      <textarea onChange={handleChange} value={phrase} />
      <button onClick={handleReverse}>reverse</button>
      <textarea
        disabled="disabled"
        value={`${phrase ? translation : ""}${isLoading ? "..." : ""}`}
      />
      <AddToCollection />
      <LanguagesWithTwoLists
        languages={languages}
        setCurrentLanguages={setCurrentLanguages}
        handleSetAutoTranslation={handleSetAutoTranslation}
        setTranslateValues={setTranslateValues}
      />
    </div>
  );
}
