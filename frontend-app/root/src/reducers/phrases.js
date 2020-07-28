import {
  TRANSLATE,
  SET_FROM,
  SET_TO,
  SET_PHRASE,
  SET_ALL,
  RESET_PHRASES,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  from: null,
  to: "en",
  phrase: "",
  translation: "",
  score: null,
  autoTranslation: false,
  isLoading: false,
};

export default function (state = { ...initialState }, action) {
  const { type, payload } = action;

  switch (type) {
    case TRANSLATE:
      return {
        ...state,
        ...payload,
        autoTranslation: payload.score ? true : false,
      };
    case SET_FROM:
      return { ...state, from: payload };
    case SET_TO:
      return { ...state, to: payload };
    case SET_PHRASE:
      return { ...state, phrase: payload };
    case SET_ALL:
      return { ...state, ...payload };
    case RESET_PHRASES:
      return { ...initialState };
    case SET_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
}
