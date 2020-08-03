import React from "react";
import Translation from "../../containers/Translations/Translation";
import { checkType, isNaN } from "../../shared/utils";

export default function ({
  handleAction,
  isLoading,
  observedRef,
  translations,
  learnedQuantity,
  translationsQuantity,
}) {
  return (
    <div>
      {checkType("number", learnedQuantity, translationsQuantity) &&
        !isNaN(learnedQuantity) &&
        !isNaN(translationsQuantity) && (
          <p>
            {learnedQuantity}/{translationsQuantity} ---{" "}
            {`${
              translationsQuantity
                ? ((learnedQuantity / translationsQuantity) * 100).toFixed()
                : 0
            }%`}
          </p>
        )}
      <div
        onClick={handleAction}
        style={{ marginBottom: 80, minHeight: isLoading ? "100vh" : 0 }}
      >
        {" "}
        {translations.map((translation) => (
          <Translation key={translation.id} translation={translation} />
        ))}
      </div>
      <div ref={observedRef} />
      <h2 style={{ position: "fixed", bottom: 0 }}>
        {isLoading ? "Loading..." : ""}
      </h2>
    </div>
  );
}
