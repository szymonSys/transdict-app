import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { checkType } from "../../shared/utils";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";
import UpdateCollection from "./UpdateCollection";
import {
  getUserCollections,
  getCollectionsWithForwardTranslationIds,
  clearCollectionsWithForwardTranslationIds,
} from "../../actions/collections";
import { addTranslation, deleteTranslation } from "../../actions/translations";
import AddCollection from "../../containers/Collection/AddCollection";

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

  const handleClick = async (event) => {
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
    <div>
      {!isVisible && (
        <button disabled={!checkCanOpen()} onClick={() => setVisibility(true)}>
          add do collection
        </button>
      )}
      {isVisible && (
        <WithInfiniteScroll
          callback={() => getCollections()}
          executionOptions={{
            condition: () => collections.length < collectionsQuantity,
            withPreload: !collections.length ? true : false,
            deps: [collections.length, collectionsQuantity],
          }}
        >
          {(ref, isLoading) => (
            <div
              style={{
                height: "20vh",
                position: "fixed",
                backgroundColor: "white",
                width: "100%",
                overflow: "scroll",
              }}
            >
              <AddCollection />
              <button onClick={() => setVisibility(false)}>close</button>
              <ul
                onClick={handleClick}
                style={{ marginBottom: 80, height: "100%" }}
              >
                {collections.map((collection) => {
                  const collectionIdString = collection.id.toString();
                  return (
                    <UpdateCollection
                      key={collection.id}
                      collectionId={collection.id}
                      translationId={collectionsIdsWithTranslationMap.get(
                        collectionIdString
                      )}
                      collectionName={collection.name}
                    />
                  );
                })}
              </ul>
              <div style={{ height: 1 }} ref={ref} />
              <h2>{isLoading ? "..." : ""}</h2>
            </div>
          )}
        </WithInfiniteScroll>
      )}
    </div>
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
