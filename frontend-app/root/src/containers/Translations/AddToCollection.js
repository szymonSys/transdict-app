import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addTranslation } from "../../actions/translations";

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
    console.log(collectionId, phrase, translation, from, to);
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
    <button disabled={!canAdd} onClick={handleClick}>
      Add
    </button>
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
