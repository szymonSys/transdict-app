import React from "react";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";
import CollectionWrapper from "../../components/Collection/CollectionWrapper";
import useMessage from "../../shared/hooks/useMessage";
import useAction from "../../shared/hooks/useAction";

import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteMessage } from "../../actions/messages";
import { checkType } from "../../shared/utils";

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

function TranslationsFromCollection({
  getTranslations,
  deleteTranslation,
  checkTranslation,
  toggleMode,
  translations: translationsObject,
  deleteMessage,
  resetTranslationsStore,
  clearTranslations,
  messages,
  languages,
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

  const handleAction = (event) => {
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

  const mapTranslation = () =>
    translations.map((translation) => ({
      ...translation,
      primaryLanguageName: languages.get(translation.primaryLanguage)?.name,
      secondaryLanguageName: languages.get(translation.secondaryLanguage)?.name,
    }));

  useAction(() => !isDictMode && toggleMode());
  useAction(() => parseInt(collectionId) !== cId && resetTranslationsStore());
  useAction(() => translations.length && clearTranslations(), [
    sortBy,
    sortDirection,
  ]);

  return (
    <WithInfiniteScroll
      callback={() => getTranslations(collectionId)}
      executionOptions={{
        condition: checkIfFetchedTranslations,
        withPreload: !translations.length ? true : false,
        deps: [translations.length, translationsQuantity],
      }}
    >
      {(ref, isLoading) => (
        <CollectionWrapper
          handleAction={handleAction}
          translations={mapTranslation()}
          learnedQuantity={learnedQuantity}
          translationsQuantity={translationsQuantity}
          observedRef={ref}
          isLoading={isLoading}
        />
      )}
    </WithInfiniteScroll>
  );
}

const mapStateToProps = (state) => ({
  translations: state.translations,
  messages: state.messages,
  languages: state.languages.languages,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslationsFromCollection);
