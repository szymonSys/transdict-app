import React from "react";
import LanguagesWithTwoLists from "../../components/Languages/LanguagesWithTwoLists";
import UpdateCollectionsSelection from "../../containers/Collection/UpdateCollectionsSelection";

export default function MainTranslatorWrapper({
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
      <h5>{languageOutputFrom}</h5>
      <textarea onChange={handleChange} value={phrase} />
      <button onClick={handleReverse}>reverse</button>
      <h5>{languageOutputTo}</h5>
      <textarea
        disabled={true}
        value={`${phrase ? translation : ""}${isLoading ? "..." : ""}`}
      />
      <UpdateCollectionsSelection />
      <LanguagesWithTwoLists
        languages={languages}
        setCurrentLanguages={setCurrentLanguages}
        handleSetAutoTranslation={handleSetAutoTranslation}
        setTranslateValues={setTranslateValues}
      />
    </div>
  );
}
