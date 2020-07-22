import React from "react";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";
import Translation from "../Translations/Translation";
import useMessage from "../../shared/hooks/useMessage";
import useAction from "../../shared/hooks/useAction";

import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteMessage } from "../../actions/messages";
import { checkType, isNaN } from "../../shared/utils";

import {
  CHECK_TRANSLATION,
  DELETE_TRANSLATION,
} from "../../services/transdict-API/actionsTypes";

import {
  getTranslations,
  deleteTranslation,
  checkTranslation,
  toggleMode,
  resetTranslationsStore,
} from "../../actions/translations";

function CollectionWrapper({
  getTranslations,
  deleteTranslation,
  checkTranslation,
  toggleMode,
  translations: translationsObject,
  deleteMessage,
  resetTranslationsStore,
  messages,
}) {
  const {
    translations,
    isDictMode,
    collection: { id: cId, translationsQuantity, learnedQuantity },
  } = translationsObject;

  const { id: collectionId } = useParams();

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

  useAction(() => !isDictMode && toggleMode());
  useAction(() => parseInt(collectionId) !== cId && resetTranslationsStore());

  return (
    <div>
      <p>{message?.text}</p>
      {checkType("number", learnedQuantity, translationsQuantity) &&
        !isNaN(learnedQuantity) &&
        !isNaN(translationsQuantity) && (
          <p>
            {learnedQuantity}/{translationsQuantity} ---{" "}
            {`${((learnedQuantity / translationsQuantity) * 100).toFixed()}%`}
          </p>
        )}
      <WithInfiniteScroll
        callback={() => getTranslations(collectionId)}
        executionOptions={{
          condition: checkIfFetchedTranslations,
          deps: [translations.length, translationsQuantity],
        }}
      >
        {(ref, isLoading) => (
          <div>
            <div onClick={handleClick} style={{ marginBottom: 80 }}>
              {" "}
              {translations.map((translation, index) => (
                <Translation key={index} translation={translation} />
              ))}
            </div>
            <div style={{ height: 1 }} ref={ref} />
            <h2 style={{ position: "fixed", bottom: 0 }}>
              {isLoading ? "Loading..." : ""}
            </h2>
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

  toggleMode: () => dispatch(toggleMode()),

  deleteMessage: (messageName) => dispatch(deleteMessage(messageName)),

  resetTranslationsStore: () => dispatch(resetTranslationsStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionWrapper);
