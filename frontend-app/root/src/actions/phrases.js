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

import { createMessage, MESSAGE_TYPES } from "../actions/messages";

export const translate = (
  text,
  { to = null, from = null, toScript = null } = {}
) => async (dispatch, getState) => {
  const response = await translateRequest(text, { from, to, toScript });
  const [data] = response;

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
    typeof data?.detetedLanguage?.language !== undefined &&
    typeof data?.detetedLanguage?.score !== undefined
  ) {
    payload.score = data.detectedLanguage.score;
    payload.from = data.detectedLanguage.language;
  }

  await dispatch({
    type: TRANSLATE,
    payload: { ...payload, translation: payload.text },
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
