import { getLanguages as getLanguagesRequest } from "../services/text-translate-API/requests";
import { GET_LANGUAGES } from "../actions/types";
import { createMessage, MESSAGE_TYPES } from "../actions/messages";

async function _getLanguagesObj() {
  const languagesFromStorage = localStorage.getItem("languages");

  return languagesFromStorage && typeof languagesFromStorage === "object"
    ? await JSON.parse(languages)
    : await getLanguagesRequest()?.translation;
}

export const getLanguages = (translationLanguage = "pl") => async (
  dispatch,
  getState
) => {
  // const response = await getLanguagesRequest();
  // if (
  //   !(typeof response === "object" && typeof response?.translation === "object")
  // )
  //   return;
  // const languagesMap = new Map(Object.entries(response.translation));

  const languages = await _getLanguagesObj();

  if (typeof languages !== "object") return;

  const languagesMap = new Map(Object.entries(languages));

  await dispatch({ type: GET_LANGUAGES, payload: languagesMap });

  if (!localStorage.getItem("languages"))
    localStorage.setItem("languages", languages);

  return getState().languages;
};
