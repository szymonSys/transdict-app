import {
  getLanguages as getLanguagesRequest,
  translate as translateRequest,
} from "../services/text-translate-API/requests";

import {
  TRANSLATE,
  SET_FROM,
  SET_TO,
  SET_PHRASE,
  SET_ALL,
  RESET_PHRASES,
} from "../actions/types";

import store from "../store";

import { createMessage, MESSAGE_TYPES } from "../actions/messages";

const {
  phrases: { from: fromLanguage, to: toLanguage },
} = store.getState();

export const translate = (
  text,
  { toLanguage, fromLanguage, toScript = null } = {}
) => async (dispatch, getState) => {
  console.log(toLanguage, fromLanguage, toScript);
  if (typeof text !== "string" || text === "")
    throw new Error("Invalid argument of translate");

  try {
    const response = await translateRequest(text, {
      from: fromLanguage,
      to: toLanguage,
      toScript,
    });

    const [data] = response;

    let payload = data?.translations;

    if (
      typeof payload === undefined ||
      !Array.isArray(payload) ||
      !payload.length
    ) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translateMsg",
          `Translation of the phrase has been failed`
        )
      );
      throw new Error("Translation of the phrase has been failed");
    } else {
      payload = payload[0];
    }

    if (
      Boolean(data?.detectedLanguage?.language) &&
      Boolean(data?.detectedLanguage?.score)
    ) {
      payload.score = data?.detectedLanguage?.score;
      payload.from = data?.detectedLanguage?.language;
    } else {
      payload.from = fromLanguage;
      payload.score = null;
    }

    const { from, to, text: translation, phrase = text, score } = payload;

    await dispatch({
      type: TRANSLATE,
      payload: { from, to, translation, phrase, score },
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.success,
        "translateMsg",
        `Phrase has been successfully translated`
      )
    );

    return getState().phrases;
  } catch (err) {
    console.error(err);
  }
};

export const setFrom = (language) => (dispatch, getState) => {
  dispatch({ type: SET_FROM, payload: language });
  return getState().phrases;
};

export const setTo = (language) => (dispatch, getState) => {
  dispatch({ type: SET_TO, payload: language });
  return getState().phrases;
};

export const setPhrase = (phrase) => (dispatch, getState) => {
  dispatch({ type: SET_PHRASE, payload: phrase });
  return getState().phrases;
};

export const resetPhrase = () => (dispatch, getState) => {
  dispatch({ type: RESET_PHRASES });
  return getState().phrases;
};
