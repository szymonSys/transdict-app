import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";
import Translation from "../Translations/Translation";
import {
  CHECK_TRANSLATION,
  DELETE_TRANSLATION,
} from "../../services/transdict-API/actionsTypes";

import { checkType } from "../../shared/utils";
import useMessage from "../../shared/hooks/useMessage";
import useAction from "../../shared/hooks/useAction";

import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import {
  getTranslations,
  deleteTranslation,
  checkTranslation,
  setLearned,
  setLimit as setTranslationsLimit,
  toggleOrder as toggleTranslationsOrder,
  setSortBy as setTranslationsSortBy,
  toggleMode,
  resetTranslationsStore,
} from "../../actions/translations";

import { deleteMessage } from "../../actions/messages";

function Collection({
  getTranslations,
  deleteTranslation,
  checkTranslation,
  setTranslationsLimit,
  toggleTranslationsOrder,
  setTranslationsSortBy,
  toggleMode,
  setLearned,
  translations: translationsObject,
  deleteMessage,
  resetTranslationsStore,
  messages,
}) {
  // TODO: add loading state to reducers, add messages, update sort and order reducers with reset translations

  const { name: collectionName, id: collectionId } = useParams();

  const {
    translations,
    isDictMode,
    collection: { id: cId, translationsQuantity, learnedQuantity },
  } = translationsObject;

  useAction(() => !isDictMode && toggleMode());
  useAction(() => parseInt(collectionId) !== cId && resetTranslationsStore());

  const message = useMessage(
    "translationsMsg",
    () => deleteMessage("translationsMsg"),
    3000,
    [messages.translationsMsg?.text]
  );

  const checkIfFetchedTranslations = () =>
    !translations.length || translations.length < translationsQuantity;

  const handleClick = (event) => {
    const { translationId, action } = event?.target?.dataset;

    if (!checkType("string", translationId)) return;

    const parsedCollectionId = parseInt(collectionId);
    const parsedTranslationId = parseInt(translationId);

    switch (action) {
      case CHECK_TRANSLATION:
        checkTranslation(parsedTranslationId, parsedCollectionId);
        break;
      case DELETE_TRANSLATION:
        deleteTranslation(parsedTranslationId, parsedCollectionId);
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <h2>{collectionName}</h2>
      <p>{message?.text}</p>
      <p>
        {isDictMode}
        {learnedQuantity}/{translationsQuantity} ---{" "}
        {`${((learnedQuantity / translationsQuantity) * 100).toFixed()}%`}
      </p>
      <WithInfiniteScroll
        callback={() => getTranslations(collectionId)}
        executionOptions={{
          condition: checkIfFetchedTranslations,
          deps: [translations.length, translationsQuantity],
        }}
      >
        {(ref) => (
          <div onClick={handleClick}>
            {translations.map((translation, index) => (
              <Translation key={index} translation={translation} />
            ))}
            <div ref={ref} />
          </div>
        )}
      </WithInfiniteScroll>
    </div>
  );
}

const mapStateToProps = (state) => ({
  translations: state.translations,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  getTranslations: (collectionId) => dispatch(getTranslations(collectionId)),

  deleteTranslation: (translationId, collectionId) =>
    dispatch(deleteTranslation({ translationId, collectionId })),

  checkTranslation: (translationId, collectionId) =>
    dispatch(checkTranslation({ translationId, collectionId })),

  setTranslationsSortBy: (sortBy) => dispatch(setTranslationsSortBy(sortBy)),

  toggleTranslationsOrder: () => dispatch(toggleTranslationsOrder()),

  setTranslationsLimit: (limit) => dispatch(setTranslationsLimit(limit)),

  toggleMode: () => dispatch(toggleMode()),

  setLearned: (options) => dispatch(setLearned(options)),

  deleteMessage: (messageName) => dispatch(deleteMessage(messageName)),

  resetTranslationsStore: () => dispatch(resetTranslationsStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
