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
  clearTranslations,
} from "../../actions/translations";
import { translate } from "../../services/text-translate-API/requests";

function CollectionWrapper({
  getTranslations,
  deleteTranslation,
  checkTranslation,
  toggleMode,
  translations: translationsObject,
  deleteMessage,
  resetTranslationsStore,
  clearTranslations,
  messages,
}) {
  const {
    translations,
    isDictMode,
    sortBy,
    sortDirection,
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
    translations.length < translationsQuantity;

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
  useAction(() => translations.length && clearTranslations(), [
    sortBy,
    sortDirection,
  ]);

  return (
    <div>
      {checkType("number", learnedQuantity, translationsQuantity) &&
        !isNaN(learnedQuantity) &&
        !isNaN(translationsQuantity) && (
          <p>
            {learnedQuantity}/{translationsQuantity} ---{" "}
            {`${
              translationsQuantity
                ? ((learnedQuantity / translationsQuantity) * 100).toFixed()
                : 0
            }%`}
          </p>
        )}
      <WithInfiniteScroll
        callback={() => getTranslations(collectionId)}
        executionOptions={{
          condition: checkIfFetchedTranslations,
          withPreload: !translations.length ? true : false,
          deps: [translations.length, translationsQuantity],
        }}
      >
        {(ref, isLoading) => (
          <div>
            <div
              onClick={handleClick}
              style={{ marginBottom: 80, minHeight: isLoading ? "100vh" : 0 }}
            >
              {" "}
              {translations.map((translation) => (
                <Translation key={translation.id} translation={translation} />
              ))}
            </div>
            <div ref={ref} />
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

  clearTranslations: () => dispatch(clearTranslations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionWrapper);
