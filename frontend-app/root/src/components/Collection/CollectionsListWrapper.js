import React from "react";
import Collection from "../../containers/Collection/Collection";
import { checkIsOdd, checkIsTopFactory } from "../../shared/utils";
import {
  StyledCollectionWrapper,
  StyledCollectionList,
} from "../../styled-components/Collections";

export default function CollectionsWrapper({
  handleClick,
  collections,
  observedRef,
  isLoading,
  url,
}) {
  const checkIsTop = checkIsTopFactory();

  return (
    <StyledCollectionWrapper>
      <StyledCollectionList
        onClick={handleClick}
        style={{ marginBottom: 80, minHeight: isLoading ? 1000 : 0 }}
      >
        {collections?.length ? (
          collections.map((collection, index) => (
            <Collection
              key={collection.id}
              collection={collection}
              url={`${url}/${collection.name}/${collection.id}`}
              isOdd={checkIsOdd(index)}
              isTop={checkIsTop(index)}
            />
          ))
        ) : (
          <p>
            {isLoading
              ? "Wczytywanie..."
              : "Nie masz jeszcze żadnej kolekcji :("}
          </p>
        )}
      </StyledCollectionList>
      <div ref={observedRef}></div>
      <h2 style={{ bottom: 0 }}>{isLoading ? "Loading..." : ""}</h2>
    </StyledCollectionWrapper>
  );
}
