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

import { checkType } from "../shared/utils";

const { SORT_DEFAULT } = TRANSLATIONS_SORT_OPTIONS;

export const getTranslations = () => async (dispatch, setState) => {};
export const getTranslationsIds = () => async (dispatch, setState) => {};
export const getTranslationsByIds = () => async (dispatch, setState) => {};
export const deleteTranslation = () => async (dispatch, setState) => {};
export const checkTranslation = () => async (dispatch, setState) => {};
export const addTranslation = () => async (dispatch, setState) => {};
export const shuffleTranslationsIds = () => async (dispatch, setState) => {};
export const clearTranslations = () => async (dispatch, setState) => {};
export const setSortBy = () => async (dispatch, setState) => {};
export const setOrder = () => async (dispatch, setState) => {};
export const setLimit = () => async (dispatch, setState) => {};
export const toggleMode = () => async (dispatch, setState) => {};
