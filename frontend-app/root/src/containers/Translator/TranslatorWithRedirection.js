import React from "react";
import WithTranslate from "../../shared/containers/WithTranslate";
import WithRedirection from "../../shared/containers/WithRedirection";
import { connect } from "react-redux";
import { resetPhrase } from "../../actions/phrases";

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
            <Translator
              phrase={translateValues.phrase}
              isLoading={isLoading}
              languages={languages}
              handleChange={handleChange}
              setTranslateValues={setTranslateValues}
              currentLanguage={
                languages.languages.get(translateValues.to)?.name
              }
            />
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
