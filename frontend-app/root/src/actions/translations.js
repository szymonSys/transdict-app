import {
  getTranslationsFromCollection as getTranslationsFromCollectionRequest,
  getTranslationsByIds as getTranslationsByIdsRequest,
  getAllTranslationsIds as getAllTranslationsIdsRequest,
  updateCollection as updateCollectionRequest,
  getAllTranslationsIds,
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
  SET_COLLECTION_DATA,
  TOGGLE_LEARNED,
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
  const {
    auth: { token },
    translations: {
      translations: currentTranslations,
      limit,
      sortDirection,
      sortBy,
      isDictMode
    },
  } = getState();

  if(!isDictMode) {
    throw new Error('App has to be in Dict Mode to get translations with limit and offset');
  }

  try{
    const response = await getTranslationsByIdsRequest(token, {
      collectionId,
      limit,
      offset = currentTranslations.length,
      sortBy,
      sortDirection
    });

    const {collectionName, collectionId: cId, createdAt, updatedAt, translations, contentIsSent} = response;

    if(!contentIsSent) {
      throw new Error('Translations have not been sent.');
    }

    await dispatch({type: SET_COLLECTION_DATA, payload: {createdAt, updatedAt, name: collectionName, id: cId}});

    await dispatch({type: UPDATE_TRANSLATIONS, payload: Array.isArray(translations) ? [...translations] : []});

    return getState().translations.translations;

  }catch(err){
    console.log(err);

    return;
  }
};

export const getTranslationsIds = (collectionId, {all=true, onlyLearned = false}={}) => async (dispatch, getState) =>{

  const {auth: {token}, translations: {isFlashcardMode}} = getState();

  if(!isFlashcardMode) {
    throw new Error('App has to be in Flashcard Mode to get all translations ids');
  }

  const areLearned = all ? null : onlyLearned ? true : false;

  try{

    const response = await getAllTranslationsIdsRequest(token, {collectionId, areLearned});

    const { translationsIds: ids, areLearned: areLearnedFromResonse, isSent } = response;

    if(!isSent){
      throw new Error('Translations ids have not been sent');
    }

    await dispatch({type: TOGGLE_LEARNED, payload: setLearnedHelper(all, onlyLearned) });

    await dispatch({type: GET_TRANSLATIONS_IDS, payload: Array.isArray(ids) ? ids : []});

    return getState().translations.ids;

  }catch(err){
    console.error(err);

    return;
  }
};

export const getTranslationsByIds = (collectionId, quantity=5) => async (dispatch, getState) => {

  const { auth: { token }, translations: { translations: currentTranslations, ids, isFlashcardMode }} = getState();

  if(!isFlashcardMode) {
    throw new Error('App has to be in Flashcard Mode to get translations by ids');
  }

  try{
    const translationsQuantity = currentTranslations.length;

    const translationsIds = ids.slice(translationsQuantity, translationsQuantity + 5);

    const response = await getTranslationsByIdsRequest(token, {collectionId, translationsIds});

    const {translations, isSent} = response;

    if(!isSent) {
      throw new Error('Translations have not been sent');
    }

    await dispatch({type: UPDATE_TRANSLATIONS, payload: translations});

    return getState().translations.translations;
    
  }catch(err){
    console.error(err);

    return;
  }
};

export const shuffleTranslationsIds = () => async (dispatch, getState) => {
  const { translations: { ids } } = getState();

  await dispatch({type: SHUFFLE_TRANSLATIONS_IDS, payload: shuffle(ids)});

  return getState().translations.ids;
};

export const deleteTranslation = () => async (dispatch, getState) => {};

export const checkTranslation = () => async (dispatch, getState) => {};

export const addTranslation = () => async (dispatch, getState) => {};

export const clearTranslations = () => async (dispatch, getState) => {};

export const setSortBy = () => async (dispatch, getState) => {};

export const setOrder = () => async (dispatch, getState) => {};

export const setLimit = () => async (dispatch, getState) => {};

export const toggleMode = () => async (dispatch, getState) => {};

export const setCollection = ({name, id, createdAt, updatedAt, translationsQuantity, learnedQuantity}={}) => async (dispatch, getState) => {

  const payload = { name, id, createdAt, updatedAt, translationsQuantity, learnedQuantity }

  if(!Object.values(payload).every(value=>checkType('string', value) || checkType('number', value))){
    throw new Error('Invalid collection parameters');
  }
  
  try{
    await dispatch({type: SET_COLLECTION_DATA, payload });
    return getState().translations.collection;

  }catch(err){
    console.error(err);
    return;
  }
};

export const setLearned = ({all=true, onlyLearned=false}={}) => async (dispatch) =>{

  if(!checkType('boolean', all, onlyLearned)){
    throw new Error('Parameters of setLearned function have to be type of boolean')
  }

  await dispatch({type: TOGGLE_LEARNED, payload: setLearnedHelper(all, onlyLearned)});

};


const setLearnedHelper = (all, onlyLearned) => all ? {onlyLearned: false, onlyUnlearned: false} : { onlyLearned, onlyUnlearned: !onlyLearned };
