import React from "react";
const SubmitButton = ({ children, onClickCallback }) => (
  <button type="submit" onClick={onClickCallback}>
    {children}
  </button>
);

export default SubmitButton;
