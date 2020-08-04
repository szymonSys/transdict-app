import React from "react";
import Languages from "../../containers/Languages";
import LanguagesList from "../../containers/Languages/LanguagesList";
import { ReactComponent as CloseSVG } from "../../img/svg/001-close.svg";
import { ReactComponent as LanguagesSVG } from "../../img/svg/034-translate-1.svg";

import {
  LanguagesWrapper,
  SmallerLanguagesBtn,
  StyledLanguagesListWrapper,
  StyledListsWrapper,
  StyledBtnCloseWrapper,
  StyledCloseBtn,
  StyledListHeader,
} from "../../styled-components/Languages";

export default function LanguagesWithOneList({
  languages,
  setTranslateValues,
  currentLanguage,
}) {
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
                <StyledListHeader>Język tłumaczenia</StyledListHeader>
                <LanguagesList
                  setLanguageKey={(key) => setTranslateValues({ to: key })}
                  languagesEntries={sortedLanguagesEntries}
                  currentLanguage={currentLanguage}
                />
              </StyledLanguagesListWrapper>
            </StyledListsWrapper>
          </LanguagesWrapper>
        ) : (
          <SmallerLanguagesBtn onClick={toggleIsOpen}>
            <LanguagesSVG />
          </SmallerLanguagesBtn>
        )
      }
    </Languages>
  );
}
