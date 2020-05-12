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

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isAuthenticating: false,
  email: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: true,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        email: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      const token =
        action?.payload?.token === undefined ? null : action.payload.token;
      const email =
        action?.payload.email === undefined ? null : action.payload.email;
      localStorage.setItem("token", token);
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        token,
        email,
      };
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticating: false,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
