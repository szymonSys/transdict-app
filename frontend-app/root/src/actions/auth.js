import {
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  authenticate as authenticateRequest,
} from "../services/transdict-API/requests";
import {
  USER_AUTHENTICATING,
  USER_AUTHENTICATED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
} from "../actions/types";

import { createMessage, MESSAGE_TYPES } from "../actions/messages";

export const authenticate = () => async (dispatch, getState) => {
  await dispatch({ type: USER_AUTHENTICATING });

  await authenticateRequest(getState().auth.token)
    .then((userData) => {
      if (userData.isAuthenticated) {
        dispatch({ type: USER_AUTHENTICATED, payload: userData.email });
        dispatch(
          createMessage(MESSAGE_TYPES.success, "authMsg", userData.message)
        );
      } else {
        dispatch({ type: AUTH_ERROR });
        dispatch(
          createMessage(MESSAGE_TYPES.fail, "authMsg", userData.message)
        );
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: AUTH_ERROR });
    });

  return getState().auth;
};

export const login = (email = null, password = null) => async (
  dispatch,
  getState
) => {
  await loginRequest(email, password)
    .then((data) => {
      if (data.isLoggedIn && data.token) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token: data.token, email: data.email },
        });
        dispatch(
          createMessage(MESSAGE_TYPES.success, "loginMsg", data.message)
        );
      } else {
        dispatch({ type: LOGIN_FAIL });
        dispatch(createMessage(MESSAGE_TYPES.fail, "loginMsg", data.message));
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: LOGIN_FAIL });
      dispatch(
        createMessage(MESSAGE_TYPES.fail, "loginMsg", "Logging in failed!")
      );
    });
  return getState().auth;
};

export const register = (email = null, password = null) => async (
  dispatch,
  getState
) => {
  await registerRequest(email, password)
    .then((data) => {
      if (!data.isSignedUp) return;
      if (data.isLoggedIn) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: { token: data.token, email: data.email },
        });
        dispatch(
          createMessage(MESSAGE_TYPES.success, "registerMsg", data.message)
        );
      } else {
        dispatch({ type: REGISTER_FAIL });
        dispatch(
          createMessage(MESSAGE_TYPES.fail, "registerMsg", data.message)
        );
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: REGISTER_FAIL });
    });
  return getState().auth;
};

export const logout = () => async (dispatch, getState) => {
  await logoutRequest(getState().auth.token)
    .then((data) => {
      if (!data.isLoggedIn) {
        dispatch({ type: LOGOUT_SUCCESS });
        createMessage(MESSAGE_TYPES.success, "logoutMsg", data.message);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  return getState().auth;
};
