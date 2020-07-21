import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";

import { checkType } from "../../shared/utils";
import useMessage from "../../shared/hooks/useMessage";

import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  Link,
} from "react-router-dom";

import {
  getUserCollections,
  deleteCollection,
  addCollection,
} from "../../actions/collections";

import { deleteMessage } from "../../actions/messages";

function CollectionsList({
  getUserCollections,
  deleteCollection,
  addCollection,
  deleteMessage,
  messages,
  collections: collectionsObject,
}) {
  // const { name: collectionName, id: collectionId } = useParams();

  const message = useMessage(
    "CollectionssMsg",
    () => deleteMessage("CollectionssMsg"),
    3000,
    [messages.CollectionssMsg?.text]
  );

  const { url } = useRouteMatch();

  const { collections, collectionsQuantity } = collectionsObject;

  const checkIfFetchedCollections = () =>
    !collections.length || collections.length < collectionsQuantity;

  // const handleClick = (event) => {
  //   const { translationId, action } = event?.target?.dataset;

  //   if (!checkType("string", translationId)) return;

  //   const parsedCollectionId = parseInt(collectionId);
  //   const parsedTranslationId = parseInt(translationId);

  //   switch (action) {
  //     case CHECK_TRANSLATION:
  //       checkTranslation(parsedTranslationId, parsedCollectionId);
  //       break;
  //     case DELETE_TRANSLATION:
  //       deleteTranslation(parsedTranslationId, parsedCollectionId);
  //       break;
  //     default:
  //       return;
  //   }
  // };

  return (
    <div>
      <p>{message?.text}</p>
      <WithInfiniteScroll
        callback={() => getUserCollections()}
        executionOptions={{
          condition: checkIfFetchedCollections,
          deps: [collections.length, collectionsQuantity],
        }}
      >
        {(ref) => (
          <div>
            {collections.map((collection) => (
              <div key={collection.id}>
                <Link to={`${url}/${collection.name}/${collection.id}`}>
                  {collection.name}
                </Link>
              </div>
            ))}
            <div ref={ref} />
          </div>
        )}
      </WithInfiniteScroll>
    </div>
  );
}

const mapStateToProps = (state) => ({
  collections: state.collections,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  addCollection: (collectionName) => dispatch(addCollection(collectionName)),

  getUserCollections: () => dispatch(getUserCollections()),

  deleteCollection: (collectionId) => dispatch(deleteCollection(collectionId)),

  deleteMessage: (messageName) => dispatch(deleteMessage(messageName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsList);
