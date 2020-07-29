import React, { useRef, useEffect } from "react";
import { checkType } from "../../shared/utils";
import UpdateCollectionItem from "../../components/Collection/UpdateCollectionItem";

export default function UpdateCollection({
  collectionId,
  translationId,
  collectionName,
}) {
  const btnRef = useRef();

  const checkTranslationId = () => checkType("number", translationId);

  const setActionType = () => (checkTranslationId() ? "delete" : "add");

  useEffect(() => {
    btnRef.current.dataset.actionType = setActionType();
    btnRef.current.dataset.collectionId = collectionId;
    if (checkTranslationId())
      btnRef.current.dataset.translationId = translationId;
  }, [collectionId, translationId]);

  return (
    <UpdateCollectionItem
      btnRef={btnRef}
      collectionName={collectionName}
      actionType={setActionType()}
    />
  );
}
