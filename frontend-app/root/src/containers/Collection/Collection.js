import React, { useRef, useEffect } from "react";

import CollectionItem from "../../components/Collection/CollectionItem";

export default function Collection({ collection, url }) {
  const deleteBtnRef = useRef();

  useEffect(() => {
    deleteBtnRef.current.dataset.collectionId = collection.id;
    deleteBtnRef.current.dataset.action = "delete_collection";
  }, []);

  return (
    <CollectionItem
      url={url}
      collection={collection}
      deleteBtnRef={deleteBtnRef}
    />
  );
}
