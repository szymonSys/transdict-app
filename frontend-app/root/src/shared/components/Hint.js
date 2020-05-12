import React from "react";

const Hint = ({ text, tag, onClickCallback }) => (
  <>
    <span> {text} </span>
    <span data-tag={tag} onClick={onClickCallback}>
      (X)
    </span>
  </>
);

export default Hint;
