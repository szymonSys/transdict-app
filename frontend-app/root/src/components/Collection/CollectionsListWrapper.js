import React from "react";
import Collection from "../../containers/Collection/Collection";

export default function CollectionsListWrapper({
  handleClick,
  collections,
  observedRef,
  isLoading,
  url,
}) {
  return (
    <div>
      <div
        onClick={handleClick}
        style={{ marginBottom: 80, minHeight: isLoading ? 1000 : 0 }}
      >
        {collections.map((collection) => (
          <Collection
            key={collection.id}
            collection={collection}
            url={`${url}/${collection.name}/${collection.id}`}
          />
        ))}
      </div>
      <div ref={observedRef}></div>
      <h2 style={{ bottom: 0 }}>{isLoading ? "Loading..." : ""}</h2>
    </div>
  );
}
