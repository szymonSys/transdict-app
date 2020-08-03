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
} from "../../styled-components/Languages";
import { ReactComponent as LanguagesSVG } from "../../img/svg/034-translate-1.svg";

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
                <button onClick={toggleIsOpen}>close</button>
              </StyledBtnCloseWrapper>
              <StyledLanguagesListWrapper>
                <h3>Język frazy</h3>
                <button disabled={isAuto} onClick={handleSetAutoTranslation}>
                  Wykryj język
                </button>
                <LanguagesList
                  setLanguageName={setCurrentLanguages}
                  setLanguageKey={(key) => setTranslateValues({ from: key })}
                  languagesEntries={sortedLanguagesEntries}
                  which={1}
                  currentLanguage={currentLanguages[0]}
                />
              </StyledLanguagesListWrapper>
              <StyledLanguagesListWrapper>
                <h3>Język tłumaczenia</h3>
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
