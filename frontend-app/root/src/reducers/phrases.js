import {
  TRANSLATE,
  SET_FROM,
  SET_TO,
  SET_PHRASE,
  SET_ALL,
  RESET_PHRASES,
} from "../actions/types";

const initialState = {
  from: null,
  to: null,
  phrase: null,
  translation: null,
  score: null,
};

export default function (state = { ...initialState }, action) {
  const { type, payload } = action;

  switch (type) {
    case TRANSLATE:
      return { ...state, ...payload };
    case SET_FROM:
      return { ...state, from: payload };
    case SET_TO:
      return { ...state, to: payload };
    case SET_PHRASE:
      return { ...state, phrase: payload };
    case SET_ALL:
      return { ...payload };
    case RESET_PHRASES:
      return { ...initialState };
    default:
      return state;
  }
}
