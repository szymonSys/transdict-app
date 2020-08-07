import React from "react";
import {
  StyledAddCollectionBtn,
  AddCollectionWrapper,
  AddColectionInputWrapper,
  StyledAddInput,
  StyledNewCollectionBtn,
} from "../../styled-components/Collections";
import { ReactComponent as HideSVG } from "../../img/svg/017-next.svg";

export default function AddCollectionInput({
  toggleIsHidden,
  addCollection,
  isHidden,
  setRef,
}) {
  return (
    <AddCollectionWrapper isHidden={isHidden}>
      <StyledNewCollectionBtn
        isHidden={isHidden}
        onClick={() => toggleIsHidden((isHidden) => !isHidden)}
      >
        {isHidden ? "Nowa kolekcja" : <HideSVG />}
      </StyledNewCollectionBtn>
      {isHidden || (
        <AddColectionInputWrapper>
          <StyledAddInput type="text" ref={setRef} id={"just-div"} />
          <StyledAddCollectionBtn onClick={addCollection}>
            Dodaj kolekcję
          </StyledAddCollectionBtn>
        </AddColectionInputWrapper>
      )}
    </AddCollectionWrapper>
  );
}
