import React, { useState, useEffect, useMemo } from "react";
import PasswordVisibilitySwitch from "../../components/PasswordVisibilitySwitch";
import SubmitButton from "./SubmitButton";
import Hint from "./Hint";

const UserForm = ({
  handleChange,
  togglePasswordVisibility,
  inputsState,
  passwordIsHidden,
  onSubmit,
  action,
  messages,
}) => {
  const [hintsWasClosed, setHintWasClosed] = useState({
    email: false,
    password: false,
  });
  const [hintsAreVisible, setHintsAreVisible] = useState({
    email: false,
    password: false,
  });

  const handleOnFocus = (e) => {
    const targetName = e.target.name;

    if (!hintsWasClosed[targetName]) {
      setHintsAreVisible({ ...hintsAreVisible, [targetName]: true });
    }
  };

  const toggleHint = (e) => {
    const target = e.target?.dataset?.tag;

    if (!target) return;

    if (!hintsWasClosed[target]) {
      setHintWasClosed({ ...hintsWasClosed, [target]: true });
    }
    setHintsAreVisible({
      ...hintsAreVisible,
      [target]: !hintsAreVisible[target],
    });
  };

  const hintShouldDisplay = (target, hintText = "", HintComponent = Hint) => {
    return hintsAreVisible[target] ? (
      <HintComponent
        tag={target}
        text={hintText}
        onClickCallback={toggleHint}
      />
    ) : (
      <span data-tag={target} onClick={toggleHint}>
        (?)
      </span>
    );
  };

  return (
    <form>
      <label htmlFor="login-email-input">email</label>
      {hintShouldDisplay("email", "Please enter an email address.")}
      <div>
        <input
          type="email"
          name="email"
          id="login-email-input"
          value={inputsState.email}
          onChange={handleChange}
          onFocus={handleOnFocus}
          placeholder="enter your email..."
        />
        {messages?.invalidEmail?.text && (
          <span>{messages.invalidEmail.text}</span>
        )}
      </div>
      <div>
        <label htmlFor="login-password-input">password</label>
        {hintShouldDisplay(
          "password",
          "Should contain 5-24 characters and at least 1: digit, upper case, lower case."
        )}
        <div>
          <input
            type={passwordIsHidden ? "password" : "text"}
            name="password"
            id="login-password-input"
            value={inputsState.password}
            onChange={handleChange}
            onFocus={handleOnFocus}
            placeholder="enter your password..."
          />
          {inputsState.password !== "" && (
            <PasswordVisibilitySwitch
              isHidden={passwordIsHidden}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          )}
          {messages?.invalidPassword?.text && (
            <span>{messages.invalidPassword.text}</span>
          )}
        </div>
      </div>
      <SubmitButton onClickCallback={onSubmit}>{action}</SubmitButton>
    </form>
  );
};

export default UserForm;
