import React from "react";
import Languages from "../Languages";
import LanguagesList from "../../components/Languages/LanguagesList";
import WithTranslate from "../../shared/containers/WithTranslate";
import WithRedirection from "../../shared/containers/WithRedirection";
import { connect } from "react-redux";
import useRedirection from "../../shared/hooks/useRedirection";
import { resetPhrase } from "../../actions/phrases";
import { useEffect } from "react";

function TranslatorWithRedirection({
  resetTranslation,
  phrases,
  languages,
  Translator,
}) {
  return (
    <WithTranslate
      phrases={phrases}
      callback={() => console.log("translation success!")}
    >
      {({ translateValues, isLoading, setTranslateValues, handleChange }) => (
        <WithRedirection
          targetPath={"/translator"}
          redirectionState={{ isRedirected: true }}
          redirectionDep={translateValues.translation}
          didMountCallback={resetTranslation}
        >
          {() => (
            <div>
              <h4>to: {languages.languages.get(translateValues.to)?.name}</h4>
              <textarea
                onChange={handleChange}
                value={translateValues.phrase}
              />
              <span>{isLoading && "Loading..."}</span>
              <h2>Languages</h2>
              <Languages languages={languages}>
                {({ sortedLanguagesEntries }) => (
                  <div>
                    <h3>Translation's language</h3>
                    <LanguagesList
                      setLanguageKey={(key) => setTranslateValues({ to: key })}
                      languagesEntries={sortedLanguagesEntries}
                    />
                  </div>
                )}
              </Languages>
            </div>
          )}
        </WithRedirection>
      )}
    </WithTranslate>
  );
}

const mapStateToProps = (state) => ({
  phrases: state.phrases,
  languages: state.languages,
});

const mapDispatchToProps = (dispatch) => ({
  resetTranslation: dispatch(resetPhrase()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslatorWithRedirection);
