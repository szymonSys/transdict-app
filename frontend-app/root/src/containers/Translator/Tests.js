import React, { useState } from "react";
import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  useSubmit,
  useValue,
  useCheck,
} from "../../shared/hooks/useControlledForm";

import { useTimeout } from "../../shared/hooks/useTime";
import useSwitch from "../../shared/hooks/useSwitch";
import { translate } from "../../actions/phrases";
import {
  getTranslations,
  getTranslationsIds,
  getTranslationsByIds,
  shuffleTranslationsIds,
  deleteTranslation,
  checkTranslation,
  addTranslation,
  clearTranslations,
  clearTranslationsIds,
  setCollectionData,
  resetTranslationsStore,
  setLearned,
  setLimit as setTranslationsLimit,
  toggleOrder as toggleTranslationsOrder,
  setSortBy as setTranslationsSortBy,
  toggleMode,
} from "../../actions/translations";
import {
  getUserCollections,
  addCollection,
  deleteCollection,
  resetCollectionsStore,
  setSortBy as setCollectionsSortBy,
  toggleOrder as toggleCollectionsOrder,
  setLimit as setCollectionsLimit,
} from "../../actions/collections";
import { getLanguages } from "../../actions/languages";
import { connect } from "react-redux";
import { getTranslationsFromCollection } from "../../services/transdict-API/requests";

function Tests({
  translate,
  getTranslations,
  getTranslationsIds,
  getTranslationsByIds,
  shuffleTranslationsIds,
  deleteTranslation,
  addTranslation,
  checkTranslation,
  resetTranslationsStore,
  clearTranslations,
  clearTranslationsIds,
  setTranslationsLimit,
  toggleTranslationsOrder,
  setTranslationsSortBy,
  toggleMode,
  setLearned,
  phrase,
  languages,
  translations,
  collections,
  messages,
}) {
  const location = useLocation();
  const [langs, reverseLanguages, setLanguages] = useSwitch([
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]);

  const getRandomTranslation = () =>
    translations.translations[
      Math.floor(Math.random() * translations.translations.length - 1)
    ];

  return (
    <div>
      {console.log(phrase)}
      {console.log(translations)}
      {console.log(messages)}
      <button onClick={reverseLanguages}>switch</button>
      <button
        onClick={() =>
          setLanguages([
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
          ])
        }
      >
        setLanguage
      </button>
      <h2>
        {langs[0]} {langs[1]}
      </h2>
      <p>Translator</p>
      <button onClick={() => translate("cześć", { toLanguage: "en" })}>
        translate
      </button>
      <button onClick={() => getTranslations(15)}>get translations</button>
      <button onClick={() => getTranslationsIds(25)}>get ids</button>
      <button onClick={() => getTranslationsByIds(25)}>
        get translations by ids
      </button>
      <button onClick={() => toggleMode()}>toggle mod</button>
      <button onClick={() => shuffleTranslationsIds()}>shuffle ids</button>
      <button onClick={() => setLearned({ all: false, onlyLearned: false })}>
        set only unlearned
      </button>
      <button onClick={() => setLearned({ all: false, onlyLearned: true })}>
        set only learned
      </button>
      <button onClick={() => setLearned({ all: true })}>set all</button>
      <button onClick={() => setTranslationsLimit(40)}>
        set translations limit
      </button>
      <button onClick={() => setTranslationsSortBy("primaryPhrase")}>
        set translations sort by
      </button>
      <button onClick={() => toggleTranslationsOrder()}>
        toggle sort order
      </button>
      <button onClick={() => deleteTranslation(getRandomTranslation().id, 15)}>
        delete translation
      </button>
      <button
        onClick={() =>
          addTranslation(15, {
            primaryPhrase: "cmoeiuyguguygygvmio",
            secondaryPhrase: "ovnuyguugyyweoivnv",
            primaryLanguage: "pl",
            secondaryLanguage: "en",
          })
        }
      >
        add Translation
      </button>
      <button onClick={() => checkTranslation(getRandomTranslation().id, 15)}>
        check translation
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  phrase: state.phrases,
  languages: state.languages,
  translations: state.translations,
  collections: state.collections,
  messages: state.messages,
});
const mapDispatchToProps = (dispatch) => ({
  translate: (text, options) => dispatch(translate(text, options)),
  getTranslations: (collectionId) => dispatch(getTranslations(collectionId)),
  getTranslationsIds: (collectionId, options) =>
    dispatch(getTranslationsIds(collectionId, options)),
  getTranslationsByIds: (collectionId, quantity = 5) =>
    dispatch(getTranslationsByIds(collectionId, quantity)),
  shuffleTranslationsIds: () => dispatch(shuffleTranslationsIds()),
  deleteTranslation: (translationId, collectionId) =>
    dispatch(deleteTranslation({ translationId, collectionId })),
  checkTranslation: (translationId, collectionId) =>
    dispatch(checkTranslation({ translationId, collectionId })),
  addTranslation: (collectionId, phraseData) =>
    dispatch(addTranslation({ collectionId }, phraseData)),
  clearTranslations: () => dispatch(clearTranslations()),
  clearTranslationsIds: () => dispatch(clearTranslationsIds()),
  resetTranslationsStore: () => dispatch(resetTranslationsStore()),
  setTranslationsSortBy: (sortBy) => dispatch(setTranslationsSortBy(sortBy)),
  toggleTranslationsOrder: () => dispatch(toggleTranslationsOrder()),
  setTranslationsLimit: (limit) => dispatch(setTranslationsLimit(limit)),
  toggleMode: () => dispatch(toggleMode()),
  setCollectionData: (collectionData) =>
    dispatch(setCollectionData(collectionData)),
  setLearned: (options) => dispatch(setLearned(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tests);
