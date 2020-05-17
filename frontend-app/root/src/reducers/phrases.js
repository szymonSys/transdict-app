import {
  TRANSLATE,
  SET_FROM,
  SET_TO,
  SET_PHRASE,
  SET_ALL,
  RESET,
} from "../actions/types";

const initialState = {
  from: null,
  to: null,
  phrase: null,
  translation: null,
  score: null,
};

export default function (state = { ...initialState }, action) {
  switch (action.type) {
    case TRANSLATE:
      return { ...state, ...action.payload };
    case SET_FROM:
      return { ...state, from: action.payload };
    case SET_TO:
      return { ...state, to: action.payload };
    case SET_PHRASE:
      return { ...state, phrase: action.payload };
    case SET_ALL:
      return { ...action.payload };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
}
