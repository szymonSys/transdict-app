import React from "react";

import {
  StyledDeleteBtn,
  StyledTranslationItem,
  StyledTranslationPhrase,
  StyledPhraseWrapper,
  StyledOptionsWrapper,
  CheckboxLabel,
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
} from "../../styled-components/Translations";
import { ReactComponent as DeleteSVG } from "../../img/svg/007-delete.svg";
import translations from "../../reducers/translations";

export default function TranslationItem({
  translation,
  deleteBtnRef,
  checkBtnRef,
}) {
  const {
    primaryLanguageName,
    secondaryLanguageName,
    primaryPhrase,
    secondaryPhrase,
    isLearned,
  } = translation;
  return (
    <StyledTranslationItem>
      <StyledPhraseWrapper>
        <StyledTranslationPhrase>
          <span>{primaryLanguageName}</span>
          {primaryPhrase}
        </StyledTranslationPhrase>
        <StyledTranslationPhrase>
          <span>{secondaryLanguageName}</span>
          {secondaryPhrase}
        </StyledTranslationPhrase>
      </StyledPhraseWrapper>
      <StyledOptionsWrapper>
        <CheckboxContainer>
          <CheckboxLabel>umiem</CheckboxLabel>
          <HiddenCheckbox checked={isLearned} />
          <StyledCheckbox ref={checkBtnRef} checked={isLearned}>
            <Icon viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </Icon>
          </StyledCheckbox>
        </CheckboxContainer>
        <StyledDeleteBtn ref={deleteBtnRef}>
          <DeleteSVG />
        </StyledDeleteBtn>
      </StyledOptionsWrapper>
    </StyledTranslationItem>
  );
}
