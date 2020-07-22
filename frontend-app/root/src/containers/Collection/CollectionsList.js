import React from "react";
import { connect } from "react-redux";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";
import Collection from "./Collection";

import { checkType } from "../../shared/utils";
import useMessage from "../../shared/hooks/useMessage";
import useAction from "../../shared/hooks/useAction";

import { useRouteMatch } from "react-router-dom";

import {
  getUserCollections,
  deleteCollection,
  clearCollections,
} from "../../actions/collections";

import { deleteMessage } from "../../actions/messages";

function CollectionsList({
  getUserCollections,
  deleteCollection,
  clearCollections,
  deleteMessage,
  messages,
  collections: collectionsObject,
}) {
  const message = useMessage(
    "CollectionsMsg",
    () => deleteMessage("CollectionsMsg"),
    3000,
    [messages.CollectionssMsg?.text]
  );

  const { url } = useRouteMatch();

  const {
    collections,
    collectionsQuantity,
    sortBy,
    sortDirection,
  } = collectionsObject;

  const checkIfFetchedCollections = () =>
    !collections.length || collections.length < collectionsQuantity;

  const handleClick = (event) => {
    const { collectionId, action } = event?.target?.dataset;

    if (!checkType("string", collectionId) || action !== "delete_collection")
      return;

    deleteCollection(parseInt(collectionId));
  };

  useAction(() => collections.length && clearCollections(), [
    sortBy,
    sortDirection,
  ]);

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
        {(ref, isLoading) => (
          <div>
            <div onClick={handleClick} style={{ marginBottom: 80 }}>
              {collections.map((collection) => (
                <Collection
                  key={collection.id}
                  collection={collection}
                  url={`${url}/${collection.name}/${collection.id}`}
                />
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
  collections: state.collections,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  getUserCollections: () => dispatch(getUserCollections()),

  deleteCollection: (collectionId) => dispatch(deleteCollection(collectionId)),

  deleteMessage: (messageName) => dispatch(deleteMessage(messageName)),

  clearCollections: () => dispatch(clearCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsList);
