import React from "react";
import LanguagesWithTwoLists from "../../components/Languages/LanguagesWithTwoLists";

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
  AddToCollection,
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
        value={
          isLoading
            ? "Loading..."
            : translateValues.phrase
            ? translateValues.translation
            : ""
        }
      />

      {AddToCollection?.$$typeof && <AddToCollection />}
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
