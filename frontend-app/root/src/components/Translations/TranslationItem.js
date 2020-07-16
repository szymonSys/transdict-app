import React from "react";

export default function TranslationItem({
  handleDelete,
  handleCheck,
  translation,
}) {
  return (
    <div>
      <p>
        {translation.primaryPhrase} [{translation.primatyLanguage}]
      </p>
      <p>
        {translation.secondaryPhrase} [{translation.secondaryLanguage}]
      </p>
      <button
        onClick={() => handleDelete(translation.id, translation.collectionId)}
      >
        delete
      </button>
      <button
        onClick={() => handleCheck(translation.id, translation.collectionId)}
      >
        {translation.isLearned ? "uncheck" : "check"}
      </button>
    </div>
  );
}
