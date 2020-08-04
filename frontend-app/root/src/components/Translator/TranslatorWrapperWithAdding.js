import React from "react";
import LanguagesWithTwoLists from "../../components/Languages/LanguagesWithTwoLists";
import AddToCollection from "../../containers/Translations/AddToCollection";
import {
  StyledTranslatorWrapperWithAdding,
  StyledLanguageInputsWrapperWithAdding,
  StyledCurrentLanguage,
  StyledSmallReverseBtn,
  StyledLanguageWrapperWithAdding,
  StyledLanguageOptionsWrapper,
  SmallerLanguageInput,
} from "../../styled-components/Translator";
import { ReactComponent as ReverseSVG } from "../../img/svg/018-sort.svg";

export default function TranslatorWrapperWithAdding({
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
    <StyledTranslatorWrapperWithAdding>
      <StyledLanguageInputsWrapperWithAdding>
        <StyledLanguageWrapperWithAdding>
          <StyledCurrentLanguage>{languageOutputFrom}</StyledCurrentLanguage>
          <SmallerLanguageInput
            placeholder={"wpisz frazę..."}
            onChange={handleChange}
            value={phrase}
          />
        </StyledLanguageWrapperWithAdding>
        <StyledLanguageOptionsWrapper>
          <LanguagesWithTwoLists
            languages={languages}
            setCurrentLanguages={setCurrentLanguages}
            handleSetAutoTranslation={handleSetAutoTranslation}
            setTranslateValues={setTranslateValues}
            currentLanguages={currentLanguages}
            isAuto={!from || autoTranslation}
          />
          <StyledSmallReverseBtn
            disabled={!from || from === to}
            onClick={handleReverse}
          >
            <ReverseSVG />
          </StyledSmallReverseBtn>
        </StyledLanguageOptionsWrapper>
        <StyledLanguageWrapperWithAdding>
          <StyledCurrentLanguage>{languageOutputTo}</StyledCurrentLanguage>
          <SmallerLanguageInput
            placeholder={"tłumaczenie..."}
            disabled={true}
            value={`${phrase ? translation : ""}${isLoading ? "..." : ""}`}
          />
        </StyledLanguageWrapperWithAdding>
      </StyledLanguageInputsWrapperWithAdding>
      <AddToCollection />
    </StyledTranslatorWrapperWithAdding>
  );
}
