import React from "react";
import Languages from "../Languages";
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
  // TODO: useLanguages, withLanguages*, withRedirection, handle all actions, addToCollections
  return (
    <WithTranslate>
      {({ translateValues, isLoading, setTranslateValues, translate }) => (
        <WithSwitch
          primary={translateValues.from}
          secondary={translateValues.to}
        >
          {({ switchables, reverse, setSwitchables }) => (
            <div>
              <Languages setLanguages={setSwitchables} />
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
