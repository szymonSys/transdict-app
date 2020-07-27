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
    if (
      event.target.value.length === 0 &&
      translateValues.translation !== null
    ) {
      newTranslateValues.translation = null;
    }
    setTranslateValues(newTranslateValues);
  };

  const handleReverse = (
    translateValues,
    reverseCurrentLanguages,
    setTranslateValues
  ) => {
    if (translateValues.from === null) return;
    reverseCurrentLanguages();
    setTranslateValues({
      from: translateValues.to,
      to: translateValues.from,
      translation: translateValues.phrase,
      phrase: translateValues.translation,
    });
  };

  const handleSetAutoTranslation = (
    translateValues,
    setCurrentLanguages,
    setTranslateValues
  ) => {
    if (translateValues.from === null) return;
    setTranslateValues({ from: null });
    setCurrentLanguages("Automatyczne wykrywanie", 1);
  };

  const setCurrentLanguagesOutput = (currentLanguages, translateValues) => [
    `${currentLanguages[0]} ${
      !translateValues.from && phrase.from && translateValues.translation
        ? " [" + languages.languages.get(phrase.from)?.name + "] "
        : ""
    }`,
    `${currentLanguages[1]}`,
  ];

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
                  handleReverse(
                    translateValues,
                    reverseCurrentLanguages,
                    setTranslateValues
                  )
                }
                handleSetAutoTranslation={() =>
                  handleSetAutoTranslation(
                    translateValues,
                    setCurrentLanguages,
                    setTranslateValues
                  )
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
