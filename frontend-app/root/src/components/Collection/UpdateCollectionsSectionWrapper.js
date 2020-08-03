import React from "react";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";
import UpdateCollection from "../../containers/Collection/UpdateCollection";
import AddCollection from "../../containers/Collection/AddCollection";
import { ReactComponent as AddToCollectionSVG } from "../../img/svg/004-plus.svg";
import { StyledAddToCollectionBtn } from "../../styled-components/Translator";

export default function UpdateCollectionsSectionWrapper({
  isVisible,
  setIsVisible,
  setIsNotVisible,
  checkCanOpen,
  getCollections,
  collections,
  collectionsQuantity,
  handleAction,
  collectionsIdsWithTranslationMap,
}) {
  return (
    <div>
      {!isVisible && (
        <StyledAddToCollectionBtn
          disabled={!checkCanOpen()}
          onClick={setIsVisible}
        >
          <AddToCollectionSVG />
        </StyledAddToCollectionBtn>
      )}
      {isVisible && (
        <WithInfiniteScroll
          callback={getCollections}
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
              <button onClick={setIsNotVisible}>close</button>
              <ul
                onClick={handleAction}
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
