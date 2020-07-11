import {
  CREATE_MESSAGE,
  RESET_MESSAGES,
  RESET_ERRORS,
  DELETE_MESSAGE,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_MESSAGE:
      const { msgName, msgText: text, msgType: type } = payload;
      return {
        ...state,
        [msgName]: {
          text,
          type,
        },
      };
    case DELETE_MESSAGE:
      const newState = { ...state };
      delete newState[payload];
      return newState;
    case RESET_MESSAGES:
      return initialState;
    default:
      return state;
  }
}
