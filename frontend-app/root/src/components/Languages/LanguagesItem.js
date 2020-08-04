import React from "react";
import { StyledLanguageItem } from "../../styled-components/Languages";

export default function LanguagesItem({ language, setRef, isCurrent }) {
  return (
    <StyledLanguageItem isCurrent={isCurrent} ref={setRef}>
      {language}
    </StyledLanguageItem>
  );
}
