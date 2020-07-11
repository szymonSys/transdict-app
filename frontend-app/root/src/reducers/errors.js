import { GET_ERRORS, RESET_ERRORS } from "../actions/types";

const initialState = {
  message: null,
  status: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ERRORS:
      return {
        message: payload?.message,
        status: payload?.status,
      };
    case RESET_ERRORS:
      return (state = initialState);
    default:
      return state;
  }
}
