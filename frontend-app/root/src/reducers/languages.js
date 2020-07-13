import { SET_LANGUAGES } from "../actions/types";

const languagesFromStorage = localStorage.getItem("languages");

const initialState = {
  areLoaded: languagesFromStorage ? true : false,
  languages: languagesFromStorage
    ? new Map(Object.entries(languagesFromStorage))
    : null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LANGUAGES:
      return { languages: new Map(Object.entries(payload)), areLoaded: true };
    default:
      return state;
  }
}
