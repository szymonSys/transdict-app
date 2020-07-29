import React from "react";
import { Link } from "react-router-dom";
import { checkType, isNaN } from "../../shared/utils";

export default function CollectionItem({ collection, deleteBtnRef, url }) {
  const {
    name,
    id,
    createdAt,
    updatedAt,
    translationsQuantity,
    learnedQuantity,
  } = collection;
  return (
    <div>
      <h3>
        <Link to={url}>{name}</Link>
      </h3>
      <p>
        created: {createdAt} / updated: {updatedAt}
      </p>
      {checkType("number", learnedQuantity, translationsQuantity) &&
        !isNaN(learnedQuantity) &&
        !isNaN(translationsQuantity) && (
          <p>
            {learnedQuantity}/{translationsQuantity} ---{" "}
            {`${
              translationsQuantity
                ? ((learnedQuantity / translationsQuantity) * 100).toFixed()
                : 0
            }%`}{" "}
            <Link to={`${url}/flashcards`}>{"learn ->"}</Link>
          </p>
        )}
      <button ref={deleteBtnRef}>delete</button>
    </div>
  );
}
