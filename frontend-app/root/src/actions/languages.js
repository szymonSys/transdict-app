import { getLanguages as getLanguagesRequest } from "../services/text-translate-API/requests";
import { SET_LANGUAGES } from "../actions/types";
import { createMessage, MESSAGE_TYPES } from "../actions/messages";

export const getLanguages = (translationLanguage = "pl") => async (
  dispatch,
  getState
) => {
  try {
    const languages = await _getLanguagesObj();

    if (typeof languages !== "object") {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "LanguagesMsg",
          `Languages have not been sent`
        )
      );

      throw new Error("Languages have not been sent");
    }

    await dispatch({ type: SET_LANGUAGES, payload: languages });

    !localStorage.getItem("languages") &&
      localStorage.setItem("languages", JSON.stringify(languages));

    dispatch(
      createMessage(
        MESSAGE_TYPES.success,
        "LanguagesMsg",
        `Languages have been set`
      )
    );

    return getState().languages;
  } catch (err) {
    console.error(err);
  }
};

async function _getLanguagesObj() {
  const languagesFromStorage = localStorage.getItem("languages");

  if (languagesFromStorage) {
    return await JSON.parse(languagesFromStorage);
  }

  const languages = await getLanguagesRequest();

  return languages.translation;
}
