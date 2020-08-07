import React from "react";
import {
  SyledCollectionItem,
  StyledCollectionName,
  StyledCollectionCheckbox,
  StyledCheckboxContainer,
} from "../../styled-components/Collections";

import { HiddenCheckbox, Icon } from "../../styled-components/Translations";

export default function UpdateCollectionItem({
  btnRef,
  collectionName,
  actionType,
}) {
  return (
    <SyledCollectionItem>
      <StyledCheckboxContainer>
        <HiddenCheckbox checked={actionType === "delete" ? true : false} />
        <StyledCollectionCheckbox
          ref={btnRef}
          checked={actionType === "delete" ? true : false}
        >
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCollectionCheckbox>
      </StyledCheckboxContainer>
      <StyledCollectionName>{collectionName}</StyledCollectionName>
    </SyledCollectionItem>
  );
}
