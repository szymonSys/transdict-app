import React from "react";
import Translation from "../../containers/Translations/Translation";
import { checkType, isNaN } from "../../shared/utils";

import {
  StyledTranslationsWrapper,
  StyledTranslationsList,
  StyledCollectionStatsWrapper,
  StyledLearnedPercents,
  StyledLearnedRatio,
} from "../../styled-components/Translations";

import {
  StyledLoadingBar,
  StyledInfoBar,
} from "../../styled-components/Collections";

export default function ({
  handleAction,
  isLoading,
  observedRef,
  translations,
  learnedQuantity,
  translationsQuantity,
}) {
  return (
    <StyledTranslationsWrapper>
      {checkType("number", learnedQuantity, translationsQuantity) &&
      !isNaN(learnedQuantity) &&
      !isNaN(translationsQuantity) ? (
        <StyledCollectionStatsWrapper>
          <StyledLearnedPercents>{`${
            translationsQuantity
              ? ((learnedQuantity / translationsQuantity) * 100).toFixed()
              : 0
          }%`}</StyledLearnedPercents>
          <StyledLearnedRatio>
            {learnedQuantity}/{translationsQuantity}
          </StyledLearnedRatio>
        </StyledCollectionStatsWrapper>
      ) : (
        <StyledCollectionStatsWrapper />
      )}
      <StyledTranslationsList
        onClick={handleAction}
        style={{ marginBottom: 80, minHeight: isLoading ? "100vh" : 0 }}
      >
        {" "}
        {translations.length ? (
          translations.map((translation) => (
            <Translation key={translation.id} translation={translation} />
          ))
        ) : (
          <StyledInfoBar>
            {isLoading
              ? "Wczytywanie..."
              : "Kolekcja jest pusta. Dodaj pierwszą frazę!"}
          </StyledInfoBar>
        )}
      </StyledTranslationsList>
      <StyledLoadingBar>{isLoading ? ". . ." : ""}</StyledLoadingBar>
      <div ref={observedRef} />
    </StyledTranslationsWrapper>
  );
}
