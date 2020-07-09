import {
  getTranslationsFromCollection as getTranslationsFromCollectionRequest,
  getTranslationsByIds as getTranslationsByIdsRequest,
  getAllTranslationsIds as getAllTranslationsIdsRequest,
  updateCollection as updateCollectionRequest,
} from "../services/transdict-API/requests";

import {
  UPDATE_TRANSLATIONS,
  ADD_TRANSLATION,
  DELETE_TRANSLATION,
  CHECK_TRANSLATION,
  CLEAR_TRANSLATIONS,
  GET_TRANSLATIONS_IDS,
  SHUFFLE_TRANSLATIONS_IDS,
  CLEAR_TRANSLATIONS_IDS,
  SET_FLASHCARD_MODE,
  SET_DICT_MODE,
  SET_TRANSLATIONS_SORT_BY,
  SET_TRANSLATIONS_LIMIT,
  SET_TRANSLATIONS_ORDER,
} from "../actions/types";

import {
  CHECK_TRANSLATION as CHECK,
  ADD_TRANSLATION as ADD,
  DELETE_TRANSLATION as DELETE,
  TRANSLATIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
  ASC_ORDER,
  DESC_ORDER,
} from "../services/transdict-API/actionsTypes";

import { createMessage, MESSAGE_TYPES } from "./messages";

import { checkType, shuffle } from "../shared/utils";

const { SORT_DEFAULT } = TRANSLATIONS_SORT_OPTIONS;

export const getTranslations = (collectionId) => async (dispatch, getState) => {
  const response = await getTranslationsByIdsRequest();
};
export const getTranslationsIds = () => async (dispatch, getState) => {};
export const getTranslationsByIds = () => async (dispatch, getState) => {};
export const deleteTranslation = () => async (dispatch, getState) => {};
export const checkTranslation = () => async (dispatch, getState) => {};
export const addTranslation = () => async (dispatch, getState) => {};
export const shuffleTranslationsIds = () => async (dispatch, getState) => {};
export const clearTranslations = () => async (dispatch, getState) => {};
export const setSortBy = () => async (dispatch, getState) => {};
export const setOrder = () => async (dispatch, getState) => {};
export const setLimit = () => async (dispatch, getState) => {};
export const toggleMode = () => async (dispatch, getState) => {};
