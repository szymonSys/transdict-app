import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addTranslation } from "../../actions/translations";
import { ReactComponent as AddToCollectionSVG } from "../../img/svg/004-plus.svg";
import { StyledAddToCollectionBtn } from "../../styled-components/Translator";

function AddToCollection({ phrases, addTranslation }) {
  const { id: collectionId } = useParams();
  const { phrase, translation, from, to } = phrases;
  const [canAdd, set] = useState(false);

  const setCanAdd = () =>
    set(
      Object.values({ phrase, translation, from, to }).every(
        (value) => value !== null && value !== ""
      )
    );

  const handleClick = () => {
    canAdd &&
      addTranslation(parseInt(collectionId), {
        primaryPhrase: phrase,
        secondaryPhrase: translation,
        primaryLanguage: from,
        secondaryLanguage: to,
      });
  };

  useEffect(() => {
    setCanAdd();
  }, [phrase, translation, from, to]);

  return (
    <StyledAddToCollectionBtn disabled={!canAdd} onClick={handleClick}>
      <AddToCollectionSVG />
    </StyledAddToCollectionBtn>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addTranslation: (collectionId, translationProps) =>
    dispatch(addTranslation(collectionId, translationProps)),
});

const mapStateToProps = (state) => ({
  phrases: state.phrases,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCollection);
