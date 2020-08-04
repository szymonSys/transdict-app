import React from "react";
import Languages from "../../containers/Languages";
import LanguagesList from "../../containers/Languages/LanguagesList";
import { useLocation } from "react-router-dom";
import {
  LanguagesWrapper,
  SelectLanguagesBtn,
  SmallerLanguagesBtn,
  StyledLanguagesListWrapper,
  StyledListsWrapper,
  StyledBtnCloseWrapper,
  StyledCloseBtn,
  StyledAutoTranslationBtn,
  StyledListHeader,
} from "../../styled-components/Languages";
import { ReactComponent as LanguagesSVG } from "../../img/svg/034-translate-1.svg";
import { ReactComponent as CloseSVG } from "../../img/svg/001-close.svg";

export default function LanguagesWithTwoLists({
  languages,
  setCurrentLanguages,
  setTranslateValues,
  handleSetAutoTranslation,
  currentLanguages,
  isAuto,
}) {
  const { pathname } = useLocation();
  return (
    <Languages languages={languages}>
      {({ sortedLanguagesEntries, isOpen, toggleIsOpen }) =>
        isOpen ? (
          <LanguagesWrapper>
            <StyledListsWrapper>
              <StyledBtnCloseWrapper>
                <StyledCloseBtn onClick={toggleIsOpen}>
                  <CloseSVG />
                </StyledCloseBtn>
              </StyledBtnCloseWrapper>
              <StyledLanguagesListWrapper>
                <StyledListHeader>Język frazy</StyledListHeader>
                <StyledAutoTranslationBtn
                  disabled={isAuto}
                  onClick={handleSetAutoTranslation}
                >
                  Wykryj język
                </StyledAutoTranslationBtn>
                <LanguagesList
                  setLanguageName={setCurrentLanguages}
                  setLanguageKey={(key) => setTranslateValues({ from: key })}
                  languagesEntries={sortedLanguagesEntries}
                  which={1}
                  currentLanguage={currentLanguages[0]}
                />
              </StyledLanguagesListWrapper>
              <StyledLanguagesListWrapper>
                <StyledListHeader which={2}>Język tłumaczenia</StyledListHeader>
                <LanguagesList
                  setLanguageName={setCurrentLanguages}
                  setLanguageKey={(key) => setTranslateValues({ to: key })}
                  languagesEntries={sortedLanguagesEntries}
                  which={2}
                  currentLanguage={currentLanguages[1]}
                />
              </StyledLanguagesListWrapper>
            </StyledListsWrapper>
          </LanguagesWrapper>
        ) : pathname === "/translator" ? (
          <SelectLanguagesBtn onClick={toggleIsOpen}>
            <span>WYBIERZ JĘZYK</span>
            <LanguagesSVG />
          </SelectLanguagesBtn>
        ) : (
          <SmallerLanguagesBtn onClick={toggleIsOpen}>
            <LanguagesSVG />
          </SmallerLanguagesBtn>
        )
      }
    </Languages>
  );
}
