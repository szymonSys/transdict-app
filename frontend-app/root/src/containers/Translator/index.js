import React from "react";
import Languages from "../Languages";
import LanguagesList from "../../components/Languages/LanguagesList";
import WithTranslate from "../../shared/containers/WithTranslate";
import WithSwitch from "../../shared/containers/WithSwitch";

import { useTimeout } from "../../shared/hooks/useTime";
import { translate } from "../../actions/phrases";
import { addTranslation } from "../../actions/translations";
import { getUserCollections } from "../../actions/collections";
import { connect } from "react-redux";

function Translator({
  translate,
  getUserCollections,
  addTranslation,
  getLanguages,
  phrase,
  languages,
  collections,
  messages,
}) {
  // TODO: withRedirection, handle all actions, addToCollections
  let timeoutId = null;
  return (
    <WithTranslate callback={() => console.log("translation success!")}>
      {({ translateValues, isLoading, setTranslateValues, translate }) => (
        <WithSwitch
          primary={translateValues.from}
          secondary={translateValues.to}
        >
          {({ switchables, reverse, setSwitchables }) => (
            <div>
              <textarea
                onChange={(e) => setTranslateValues({ phrase: e.target.value })}
                value={translateValues.phrase}
              />
              <button onClick={translate}>translate</button>
              <span>{phrase.translation}</span>
              <h2>Languages</h2>
              <Languages>
                {({ sortedLanguagesEntries }) => (
                  <div>
                    <h3>Phrase's language</h3>
                    <button
                      onClick={() => {
                        setTranslateValues({ from: null });
                        setSwitchables(null, 1);
                      }}
                    >
                      Wykryj język
                    </button>
                    <LanguagesList
                      setLanguageName={setSwitchables}
                      setLanguageKey={(key) =>
                        setTranslateValues({ from: key })
                      }
                      languagesEntries={sortedLanguagesEntries}
                      which={1}
                    />
                    <button
                      onClick={() => {
                        reverse();
                        setTranslateValues({
                          from: translateValues.to,
                          to: translateValues.from,
                          translation: translateValues.phrase,
                          phrase: translateValues.translation,
                        });
                      }}
                    >
                      reverse
                    </button>
                    <h3>Translation's language</h3>
                    <LanguagesList
                      setLanguageName={setSwitchables}
                      setLanguageKey={(key) => setTranslateValues({ to: key })}
                      languagesEntries={sortedLanguagesEntries}
                      which={2}
                    />
                    {/* {console.log(translateValues)} */}
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
  collections: state.collections,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  translate: (text, options) => dispatch(translate(text, options)),

  addTranslation: (collectionId, phraseData) =>
    dispatch(addTranslation({ collectionId }, phraseData)),

  getUserCollections: () => dispatch(getUserCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Translator);
