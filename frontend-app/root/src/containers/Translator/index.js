import React from "react";
import Languages from "../Languages";
import LanguagesList from "../../components/Languages/LanguagesList";
import WithTranslate from "../../shared/containers/WithTranslate";
import WithSwitch from "../../shared/containers/WithSwitch";
import { connect } from "react-redux";
import { getUserCollections } from "../../actions/collections";

function Translator({ phrase, languages, messages }) {
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
              <h4>
                from: {currentLanguages[0]}
                {!translateValues.from &&
                  phrase.from &&
                  translateValues.translation &&
                  `[${languages.languages.get(phrase.from)?.name}]`}
              </h4>
              <h4>to: {currentLanguages[1]}</h4>
              <textarea
                onChange={(event) =>
                  handleChange(translateValues, setTranslateValues, event)
                }
                value={translateValues.phrase}
              />
              <button
                onClick={() =>
                  handleReverse(
                    translateValues,
                    reverseCurrentLanguages,
                    setTranslateValues
                  )
                }
              >
                reverse
              </button>
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
                    <button
                      onClick={() =>
                        handleSetAutoTranslation(
                          translateValues,
                          setCurrentLanguages,
                          setTranslateValues
                        )
                      }
                    >
                      Wykryj język
                    </button>
                    <LanguagesList
                      setLanguageName={setCurrentLanguages}
                      setLanguageKey={(key) =>
                        setTranslateValues({ from: key })
                      }
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

export default connect(mapStateToProps)(Translator);
