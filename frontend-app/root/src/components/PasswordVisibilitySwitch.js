import React from "react";
import { ReactComponent as ShowPasswordSVG } from "../img/svg/view.svg";
import { ReactComponent as HidePasswordSVG } from "../img/svg/hide.svg";

const PasswordVisibilitySwitch = ({ isHidden, togglePasswordVisibility }) => {
  const MatchedSwitch = isHidden ? ShowPasswordSVG : HidePasswordSVG;

  return (
    <MatchedSwitch onClick={togglePasswordVisibility} style={{ width: 25 }} />
  );
};

export default PasswordVisibilitySwitch;
