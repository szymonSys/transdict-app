import { CREATE_MESSAGE, RESET_STATE } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return {
        ...state,
        [action.payload.msgName]: {
          text: action.payload.msgText,
          type: action.payload.msgType,
        },
      };
    case RESET_STATE:
      return (state = initialState);
    default:
      return state;
  }
}
