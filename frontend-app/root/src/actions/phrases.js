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
  RESET,
} from "../actions/types";

import store from "../store";

import { createMessage, MESSAGE_TYPES } from "../actions/messages";

const {
  phrases: { from: languageFrom, to: languageTo },
} = store.getState();

export const translate = (
  text,
  { languageTo, languageFrom, toScript = null } = {}
) => async (dispatch, getState) => {
  if (typeof text !== "string" || text === "") return;

  const response = await translateRequest(text, {
    from: languageFrom,
    to: languageTo,
    toScript,
  });

  const [data] = response;

  console.log(data);

  let payload = data?.translations;

  if (
    typeof payload === undefined ||
    !Array.isArray(payload) ||
    !payload.length
  ) {
    return;
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
    payload.from = languageFrom;
    payload.score = null;
  }

  const { from, to, text: translation, phrase = text, score } = payload;

  await dispatch({
    type: TRANSLATE,
    payload: { from, to, translation, phrase, score },
  });
  return getState().phrases;
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
  dispatch({ type: RESET });
  return getState().phrases;
};
