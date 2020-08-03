import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { checkType } from "../../shared/utils";
import UpdateCollectionSectionWrapper from "../../components/Collection/UpdateCollectionsSectionWrapper";

import {
  getUserCollections,
  getCollectionsWithForwardTranslationIds,
  clearCollectionsWithForwardTranslationIds,
} from "../../actions/collections";
import { addTranslation, deleteTranslation } from "../../actions/translations";

function UpdateCollectionsSelection({
  collections,
  isAuthenticated,
  collectionsQuantity,
  collectionsIdsWithTranslationMap,
  translation,
  getCollections,
  getCollectionsIdsWithTranslation,
  clearCollectionsIdsWithTranslation,
  addToCollection,
  deleteFromClollection,
}) {
  const [isVisible, setVisibility] = useState(false);
  const [canOpen, setIfCanOpen] = useState(false);

  const {
    primaryPhrase,
    secondaryPhrase,
    primaryLanguage,
    secondaryLanguage,
  } = translation;

  const handleAction = async (event) => {
    const { actionType, translationId, collectionId } = event.target.dataset;

    let actionIsExecuted = false;

    if (!checkType("string", collectionId, actionType)) return;

    const collectionIdInt = parseInt(collectionId);

    if (actionType === "add") {
      await addToCollection(collectionIdInt, translation);
      actionIsExecuted = true;
    }

    if (actionType === "delete" && checkType("string", translationId)) {
      await deleteFromClollection(collectionIdInt, parseInt(translationId));
      actionIsExecuted = true;
    }

    if (actionIsExecuted) await getCollectionsIdsWithTranslation();
  };

  const checkShouldOpen = () =>
    Object.values(translation).every(
      (value) => checkType("string", value) && value
    );

  const checkCanOpen = () => isAuthenticated && canOpen;

  useEffect(() => {
    isVisible && getCollectionsIdsWithTranslation();
  }, [isVisible]);

  useEffect(() => {
    checkShouldOpen()
      ? !canOpen && setIfCanOpen(true)
      : canOpen && setIfCanOpen(false);
  }, [primaryPhrase, secondaryPhrase, primaryLanguage, secondaryLanguage]);

  useEffect(
    () => () => {
      clearCollectionsIdsWithTranslation();
    },
    []
  );

  return (
    <UpdateCollectionSectionWrapper
      isVisible={isVisible}
      setIsVisible={() => setVisibility(true)}
      setIsNotVisible={() => setVisibility(false)}
      checkCanOpen={checkCanOpen}
      collections={collections}
      collectionsQuantity={collectionsQuantity}
      handleAction={handleAction}
      collectionsIdsWithTranslationMap={collectionsIdsWithTranslationMap}
      getCollections={getCollections}
    />
  );
}

const mapStateToProps = (state) => {
  const {
    collections: {
      collections,
      collectionsQuantity,
      collectionsWithTranslationData: {
        ids: collectionsIdsWithTranslation,
        isSent: idsListIsSent,
      },
    },
    auth: { isAuthenticated },
    phrases: {
      from: primaryLanguage,
      to: secondaryLanguage,
      phrase: primaryPhrase,
      translation: secondaryPhrase,
    },
  } = state;

  return {
    collections,
    isAuthenticated,
    collectionsQuantity,
    collectionsIdsWithTranslationMap: new Map(
      Object.entries(collectionsIdsWithTranslation)
    ),
    translation: {
      primaryLanguage,
      secondaryLanguage,
      primaryPhrase,
      secondaryPhrase,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToCollection: (collectionId, translationProps) =>
    dispatch(addTranslation(collectionId, translationProps)),

  deleteFromClollection: (collectionId, translationId) =>
    dispatch(deleteTranslation({ collectionId, translationId })),

  getCollections: () => dispatch(getUserCollections()),

  getCollectionsIdsWithTranslation: () =>
    dispatch(getCollectionsWithForwardTranslationIds()),

  clearCollectionsIdsWithTranslation: () =>
    dispatch(clearCollectionsWithForwardTranslationIds()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCollectionsSelection);
