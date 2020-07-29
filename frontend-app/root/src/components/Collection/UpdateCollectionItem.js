import React from "react";

export default function UpdateCollectionItem({
  btnRef,
  collectionName,
  actionType,
}) {
  return (
    <li>
      <button ref={btnRef}>{actionType}</button>
      <span>{collectionName}</span>
    </li>
  );
}
