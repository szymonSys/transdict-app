import React from "react";
import LanguagesWithTwoLists from "../../components/Languages/LanguagesWithTwoLists";
import UpdateCollectionsSelection from "../../containers/Collection/UpdateCollectionsSelection";
import {
  StyledMainTranslatorWrapper,
  StyledCurrentLanguage,
  StyledLanguageInput,
  StyledLanguageInputsWrapper,
  StyledReverseBtn,
  StyledLanguageWrapper,
} from "../../styled-components/Translator";
import { ReactComponent as ReverseSVG } from "../../img/svg/018-sort.svg";

export default function MainTranslatorWrapper({
  translateValues,
  isLoading,
  languages,
  handleChange,
  handleReverse,
  handleSetAutoTranslation,
  setCurrentLanguagesOutput,
  setCurrentLanguages,
  setTranslateValues,
  currentLanguages,
}) {
  const [languageOutputFrom, languageOutputTo] = setCurrentLanguagesOutput();
  const { phrase, translation, from, to, autoTranslation } = translateValues;

  return (
    <StyledMainTranslatorWrapper>
      <LanguagesWithTwoLists
        languages={languages}
        setCurrentLanguages={setCurrentLanguages}
        handleSetAutoTranslation={handleSetAutoTranslation}
        setTranslateValues={setTranslateValues}
        currentLanguages={currentLanguages}
        isAuto={!from || autoTranslation}
      />
      <StyledLanguageInputsWrapper>
        <StyledLanguageWrapper>
          <StyledCurrentLanguage>{languageOutputFrom}</StyledCurrentLanguage>
          <StyledLanguageInput
            placeholder={"wpisz frazę..."}
            onChange={handleChange}
            value={phrase}
          />
        </StyledLanguageWrapper>
        <StyledReverseBtn
          disabled={!from || from === to}
          onClick={handleReverse}
        >
          <ReverseSVG />
        </StyledReverseBtn>
        <StyledLanguageWrapper>
          <StyledCurrentLanguage>{languageOutputTo}</StyledCurrentLanguage>
          <StyledLanguageInput
            placeholder={"tłumaczenie..."}
            disabled={true}
            value={`${phrase ? translation : ""}${isLoading ? "..." : ""}`}
          />
        </StyledLanguageWrapper>
      </StyledLanguageInputsWrapper>
      <UpdateCollectionsSelection />
    </StyledMainTranslatorWrapper>
  );
}
