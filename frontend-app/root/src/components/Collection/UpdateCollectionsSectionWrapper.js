import React from "react";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";
import UpdateCollectionsSection from "./UpdateCollectionSection";
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
    <>
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
            <UpdateCollectionsSection
              setIsNotVisible={setIsNotVisible}
              collections={collections}
              handleAction={handleAction}
              collectionsIdsWithTranslationMap={
                collectionsIdsWithTranslationMap
              }
              isLoading={isLoading}
              observedRef={ref}
            />
          )}
        </WithInfiniteScroll>
      )}
    </>
  );
}
