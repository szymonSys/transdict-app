import { GET_ERRORS, RESET_STATE } from "../actions/types";

const initialState = {
  message: null,
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action?.payload?.message,
        status: action?.payload?.status,
      };
    case RESET_STATE:
      return (state = initialState);
    default:
      return state;
  }
}
