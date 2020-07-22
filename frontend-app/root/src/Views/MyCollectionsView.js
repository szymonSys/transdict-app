import React, { useState, useEffect, useCallback, useRef } from "react";
import CollectionsList from "../containers/Collection/CollectionsList";
import AddCollection from "../containers/Collection/AddCollection";
import CollectionsSorting from "../containers/Collection/CollectionsSorting";
import Sorting from "../shared/containers/Sorting";

export default function MyCollectionsView() {
  return (
    <div>
      <h1>My Collections</h1>
      <AddCollection />
      <CollectionsSorting>
        {({ setSortBy, toggleOrder, sortBy, sortingOptions }) => (
          <Sorting
            currentSortBy={sortBy}
            sortingOptions={sortingOptions}
            toggleOrder={toggleOrder}
            setSortBy={setSortBy}
          />
        )}
      </CollectionsSorting>
      <CollectionsList />
    </div>
  );
}
