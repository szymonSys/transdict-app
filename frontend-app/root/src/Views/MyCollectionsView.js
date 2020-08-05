import React from "react";
import CollectionsList from "../containers/Collection/CollectionsList";
import AddCollection from "../containers/Collection/AddCollection";
import CollectionsSorting from "../containers/Collection/CollectionsSorting";
import { COLLECTIONS_SORT_OPTIONS } from "../services/transdict-API/actionsTypes";

export default function MyCollectionsView() {
  return (
    <div>
      <h1>My Collections</h1>
      <AddCollection />
      <CollectionsSorting sortingOptionsObjects={COLLECTIONS_SORT_OPTIONS} />
      <CollectionsList />
    </div>
  );
}
