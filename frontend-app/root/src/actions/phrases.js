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
  SET_LOADING,
} from "../actions/types";

import { checkType } from "../shared/utils";

import store from "../store";

import { createMessage, MESSAGE_TYPES } from "../actions/messages";

const {
  phrases: { from: fromLanguage, to: toLanguage },
} = store.getState();

export const translate = (
  text,
  { toLanguage, fromLanguage, toScript = null } = {}
) => async (dispatch, getState) => {
  if (typeof text !== "string" || text === "")
    throw new Error("Invalid argument of translate");

  try {
    dispatch({ type: SET_LOADING, payload: true });
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
      payload: { from, to, translation, phrase, score, isLoading: false },
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
    dispatch({ type: SET_LOADING, payload: false });
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

export const setPhrases = (props) => (dispatch, getState) => {
  const phrases = getState().phrases;
  checkType("object", props) &&
    props !== null &&
    dispatch({ type: SET_ALL, payload: setProps(phrases, props) });
  return getState().phrases;
};

const checkValue = (object, key) =>
  key in object &&
  (checkType("string", object[key]) ||
    checkType("boolean", object[key]) ||
    object[key] === null);

const setProps = (prevValues, newValues) => {
  if (!checkType("object", newValues) || newValues === null)
    throw new Error("newValues has to be type of object");

  return Object.entries(newValues).reduce(
    (values, [key, value]) =>
      checkValue(prevValues, key) ? { ...values, [key]: value } : values,
    prevValues
  );
};

// Object.keys(props).every((key) => checkValue(phrases, key))
