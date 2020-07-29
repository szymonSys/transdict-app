import React from "react";

export default function UpdateCollectionItem({
  btnRef,
  collectionName,
  actionType,
}) {
  return (
    <li>
      <span>{collectionName}</span>
      <button ref={btnRef}>{actionType}</button>
    </li>
  );
}
