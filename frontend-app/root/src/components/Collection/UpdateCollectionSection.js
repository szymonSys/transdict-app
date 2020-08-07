import React from "react";
import UpdateCollection from "../../containers/Collection/UpdateCollection";
import AddCollection from "../../containers/Collection/AddCollection";
import {
  StyledCollectionSectionWrapper,
  StyledCloseBtn,
  StyledCollectionsList,
  StyledLoading,
} from "../../styled-components/Collections";
import { ReactComponent as CancelSVG } from "../../img/svg/cancel.svg";

export default function UpdateCollectionsSection({
  setIsNotVisible,
  collections,
  handleAction,
  collectionsIdsWithTranslationMap,
  isLoading,
  observedRef,
}) {
  return (
    <StyledCollectionSectionWrapper>
      <StyledCloseBtn onClick={setIsNotVisible}>
        <CancelSVG />
      </StyledCloseBtn>
      <AddCollection />
      <StyledCollectionsList onClick={handleAction}>
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
      </StyledCollectionsList>
      <StyledLoading>{isLoading ? ". . ." : ""}</StyledLoading>
      <div ref={observedRef} />
    </StyledCollectionSectionWrapper>
  );
}
