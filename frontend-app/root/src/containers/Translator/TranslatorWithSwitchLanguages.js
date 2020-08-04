import React from "react";
import WithTranslate from "../../shared/containers/WithTranslate";
import WithSwitch from "../../shared/containers/WithSwitch";
import { connect } from "react-redux";

function TranslatorWithSwitchLanguages({ phrases, languages, Translator }) {
  const handleReverse = ({
    translateValues,
    reverseCurrentLanguages,
    setCurrentLanguages,
    setTranslateValues,
  }) => {
    if (translateValues.from === null) return;
    translateValues.autoTranslation
      ? setCurrentLanguages([
          languages.languages.get(translateValues.to)?.name,
          languages.languages.get(translateValues.from)?.name,
        ])
      : reverseCurrentLanguages();
    setTranslateValues({
      from: translateValues.to,
      to: translateValues.from,
      translation: translateValues.phrase,
      phrase: translateValues.translation,
    });
  };

  const handleSetAutoTranslation = ({
    translateValues,
    setCurrentLanguages,
    setTranslateValues,
  }) => {
    if (
      translateValues.from === null ||
      translateValues.autoTranslation === true
    )
      return;
    setTranslateValues({ from: null, autoTranslation: false });
    setCurrentLanguages(`Automatyczne wykrywanie`, 1);
  };

  const setCurrentLanguagesOutput = (currentLanguages, translateValues) => {
    const language = languages.languages.get(translateValues.from)?.name;
    return [
      `${currentLanguages[0]} ${
        translateValues.autoTranslation &&
        translateValues.translation &&
        language
          ? " [" + language + "] "
          : ""
      }`,
      `${currentLanguages[1]}`,
    ];
  };

  return (
    <WithTranslate
      callback={() => console.log("translation success!")}
      phrases={phrases}
    >
      {({ translateValues, isLoading, setTranslateValues, handleChange }) => (
        <WithSwitch
          primary={
            languages.languages.get(translateValues.from)?.name ||
            "Automatyczne wykrywanie"
          }
          secondary={languages.languages.get(translateValues.to)?.name}
        >
          {({
            switchables: currentLanguages,
            reverse: reverseCurrentLanguages,
            setSwitchables: setCurrentLanguages,
          }) => (
            <Translator
              currentLanguages={currentLanguages}
              translateValues={translateValues}
              isLoading={isLoading}
              languages={languages}
              setTranslateValues={setTranslateValues}
              setCurrentLanguages={setCurrentLanguages}
              handleChange={handleChange}
              handleReverse={() =>
                handleReverse({
                  translateValues,
                  reverseCurrentLanguages,
                  setCurrentLanguages,
                  setTranslateValues,
                })
              }
              handleSetAutoTranslation={() =>
                handleSetAutoTranslation({
                  translateValues,
                  setCurrentLanguages,
                  setTranslateValues,
                })
              }
              setCurrentLanguagesOutput={() =>
                setCurrentLanguagesOutput(currentLanguages, translateValues)
              }
            />
          )}
        </WithSwitch>
      )}
    </WithTranslate>
  );
}

const mapStateToProps = (state) => ({
  phrases: state.phrases,
  languages: state.languages,
});

export default connect(mapStateToProps)(TranslatorWithSwitchLanguages);
