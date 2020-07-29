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
  return (
    <div>
      <h5>{languageOutputFrom}</h5>
      <textarea onChange={handleChange} value={translateValues.phrase} />
      <button onClick={handleReverse}>reverse</button>
      <h5>{languageOutputTo}</h5>
      <textarea
        disabled={true}
        value={`${translateValues.phrase ? translateValues.translation : ""}${
          isLoading ? "..." : ""
        }`}
      />
      <UpdateCollectionsSelection />
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
