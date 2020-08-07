import React from "react";
import LanguagesWithOneList from "../Languages/LanguagesWithOneList";
import {
  StyledTranslatorShortcutWrapper,
  StyledCurrentLanguage,
  SmallestLanguageInput,
  LanguageSelectionWrapper,
} from "../../styled-components/Translator";

export default function TranslatorShortcutWrapper({
  phrase,
  isLoading,
  languages,
  handleChange,
  currentLanguage,
  setTranslateValues,
}) {
  return (
    <StyledTranslatorShortcutWrapper>
      <LanguageSelectionWrapper>
        <LanguagesWithOneList
          languages={languages}
          setTranslateValues={setTranslateValues}
          currentLanguage={currentLanguage}
        />
        <StyledCurrentLanguage>
          <span>Tłumacz na: </span>
          {currentLanguage}
        </StyledCurrentLanguage>
      </LanguageSelectionWrapper>

      <SmallestLanguageInput
        onChange={handleChange}
        value={phrase}
        placeholder={"wpisz frazę..."}
      />
      <span>{isLoading && ". . ."}</span>
    </StyledTranslatorShortcutWrapper>
  );
}
