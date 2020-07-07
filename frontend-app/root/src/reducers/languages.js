import { GET_LANGUAGES } from "../actions/types";

const languagesFromStorage = localStorage.getItem("languages");

const initialState = {
  languages:
    languagesFromStorage && typeof languagesFromStorage === "object"
      ? new Map(Object.entries(languagesFromStorage))
      : null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LANGUAGES:
      return { ...action.payload };
    default:
      return state;
  }
}
