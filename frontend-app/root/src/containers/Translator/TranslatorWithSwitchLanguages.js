import React from "react";
// import MainTranslatorWrapper from "../../components/Translations/MainTranslatorWrapper";
import WithTranslate from "../../shared/containers/WithTranslate";
import WithSwitch from "../../shared/containers/WithSwitch";
import { connect } from "react-redux";

function TranslatorWithSwitchLanguages({
  phrase,
  languages,
  Translator,
  AddToCollection,
}) {
  const handleChange = (translateValues, setTranslateValues, event) => {
    const newTranslateValues = { phrase: event.target.value };
    if (!event.target.value?.length && translateValues.translation?.length) {
      newTranslateValues.translation = "";
    }
    if (translateValues.autoTranslation && translateValues.from !== null) {
      newTranslateValues.from = null;
      newTranslateValues.autoTranslation = false;
    }
    setTranslateValues(newTranslateValues);
  };

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
    console.log(translateValues);
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
    <WithTranslate callback={() => console.log("translation success!")}>
      {({ translateValues, isLoading, setTranslateValues, translate }) => (
        <WithSwitch primary={"Automatyczne wykrywanie"} secondary={"Angielski"}>
          {({
            switchables: currentLanguages,
            reverse: reverseCurrentLanguages,
            setSwitchables: setCurrentLanguages,
          }) => (
            <div>
              <Translator
                AddToCollection={AddToCollection}
                translateValues={translateValues}
                isLoading={isLoading}
                languages={languages}
                setTranslateValues={setTranslateValues}
                setCurrentLanguages={setCurrentLanguages}
                handleChange={(event) =>
                  handleChange(translateValues, setTranslateValues, event)
                }
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
            </div>
          )}
        </WithSwitch>
      )}
    </WithTranslate>
  );
}

const mapStateToProps = (state) => ({
  phrase: state.phrases,
  languages: state.languages,
  messages: state.messages,
});

export default connect(mapStateToProps)(TranslatorWithSwitchLanguages);
