import React from "react";

export default function TranslationItem({
  translation,
  deleteBtnRef,
  checkBtnRef,
}) {
  return (
    <div>
      <p>
        {translation.primaryPhrase} [{translation.primaryLanguage}]
      </p>
      <p>
        {translation.secondaryPhrase} [{translation.secondaryLanguage}]
      </p>
      <button ref={deleteBtnRef}>delete</button>
      <button ref={checkBtnRef}>
        {translation.isLearned ? "uncheck" : "check"}
      </button>
    </div>
  );
}
