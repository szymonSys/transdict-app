import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register, login } from "../../actions/auth";
import {
  createMessage,
  resetState,
  MESSAGE_TYPES,
} from "../../actions/messages";

const WithFormHandling = (
  WrappedComponent,
  { action = "login" } = {},
  ...rest
) => {
  const actionName =
    typeof action === "string" && action !== "" ? action.toLowerCase() : null;

  if (!(actionName === "login" || actionName === "register")) {
    throw new Error('action parameter must be "login" or "register" ');
  }

  const Wrapper = ({
    isAuthenticated,
    submitCallback,
    createMessage,
    resetMessages,
    messages,
  }) => {
    const [inputsState, setInputsState] = useState({ email: "", password: "" });
    const [passwordIsHidden, setPasswordIsHidden] = useState(true);
    const [isValid, setIsValid] = useState({ email: null, password: null });

    useEffect(() => {
      resetMessages();
    }, []);

    useEffect(() => {
      const { email: emailIsValid, password: passwordIsValid } = isValid;
      const { email, password } = inputsState;

      if (emailIsValid && passwordIsValid && email && password) {
        submitCallback(email, password);
      } else {
        !emailIsValid &&
          emailIsValid !== null &&
          createMessage(MESSAGE_TYPES.fail, "invalidEmail", "Email is invalid");
        !passwordIsValid &&
          passwordIsValid !== null &&
          createMessage(
            MESSAGE_TYPES.fail,
            "invalidPassword",
            "Password is invalid"
          );
      }
      setInputsState({ email: "", password: "" });
    }, [isValid]);

    if (isAuthenticated) return <Redirect to="/" />;

    const handleChange = (event) => {
      const input = event.target;
      const changingValue = input.name;

      setInputsState({ ...inputsState, [changingValue]: input.value });
    };

    const togglePasswordVisibility = () => {
      const isHidden = passwordIsHidden;

      setPasswordIsHidden(!isHidden);

      return isHidden ? "password" : "text";
    };

    const onSubmit = (event) => {
      event.preventDefault();
      resetMessages();
      if (!inputsState.password || !inputsState.email) {
        createMessage(
          MESSAGE_TYPES.info,
          "blankInput",
          "Enter email and password"
        );
        return;
      }

      validUserData();
    };

    const validEmail = (email = inputsState.email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validPassword = (password = inputsState.password) =>
      /^[0-9a-zA-Z]{5,24}$/.test(password);

    const validUserData = () =>
      setIsValid({
        password: validPassword(),
        email: validEmail(),
      });

    return (
      <>
        <p>
          {actionName === "register" &&
            messages?.registerMsg &&
            messages.registerMsg.text}
        </p>
        <p>
          {actionName === "login" &&
            messages?.loginMsg &&
            messages.loginMsg.text}
        </p>
        <WrappedComponent
          onSubmit={onSubmit}
          togglePasswordVisibility={togglePasswordVisibility}
          handleChange={handleChange}
          passwordIsHidden={passwordIsHidden}
          inputsState={inputsState}
          action={actionName}
          messages={messages}
          {...rest}
        />
        <p>{messages?.blankInput && messages.blankInput.text}</p>
      </>
    );
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    messages: state.messages,
  });

  const mapDispatchToProps = (dispatch) => {
    return {
      submitCallback: (email, password) =>
        dispatch(matchAction(actionName)(email, password)),
      createMessage: (msgType, msgName, mesText) =>
        dispatch(createMessage(msgType, msgName, mesText)),
      resetMessages: () => dispatch(resetState()),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};

const actions = { login, register };

const matchAction = (actionName) => {
  if (typeof actionName !== "string")
    throw new Error("action name must be the string");

  return actions[actionName];
};

export default WithFormHandling;
