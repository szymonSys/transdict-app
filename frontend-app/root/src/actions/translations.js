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
  TOGGLE_MODE,
  SET_TRANSLATIONS_SORT_BY,
  SET_TRANSLATIONS_LIMIT,
  SET_TRANSLATIONS_ORDER,
  SET_COLLECTION_DATA,
  TOGGLE_LEARNED,
  RESET_TRANSLATIONS_STORE
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

export const deleteTranslation = ({translationId=null, collectionId=null}={}) => async (dispatch, getState) => handleTranslationUpdate(getState, dispatch, translationId, collectionId, DELETE);

export const checkTranslation = ({translationId=null, collectionId=null}={}) => async (dispatch, getState) => handleTranslationUpdate(getState, dispatch, translationId, collectionId);

export const addTranslation = ({collectionId=null}={}, {
  primaryPhrase = null,
  secondaryPhrase = null,
  primaryLanguage = null,
  secondaryLanguage = null,
} = {}) => async (dispatch, getState) => {

  if(!(checkType('number', collectionId) && checkType('string', primaryPhrase, secondaryPhrase, primaryLanguage, secondaryLanguage))){
    throw new Error('Collection id has to be type of number, all new translation parameters have to be type of string');
  }

  const {auth:{token}} = getState();

  try{
    const response = await updateCollectionRequest(token, {collectionId}, {primaryPhrase, secondaryPhrase, primaryLanguage, secondaryLanguage});

    const {isUpdated, newTranslation} = response;
  
    if(!(isUpdate && checkType('object', newTranslation))){
      throw new Error('Translation has not been added');
    }
  
    if(Object.values(newTranslation).some(value=>value === undefined || value === null)){
      throw new Error('Invalid type of responded new translation value');
    }
  
    await dispatch({type: ADD_TRANSLATION, payload: newTranslation});

    return getState().translations.translations;

  }catch(err){
    console.error(err)
  }
};

export const clearTranslations = () => async (dispatch) => dispatch({type: CLEAR_TRANSLATIONS});

export const clearTranslationsIds = () => async (dispatch) => dispatch({type: CLEAR_TRANSLATIONS_IDS});

export const resetTranslationsStore = () => async (dispatch) => dispatch({type: RESET_TRANSLATIONS_STORE});

export const setSortBy = (sortBy) => async (dispatch, getState) => {
  if(Object.values(TRANSLATIONS_SORT_OPTIONS).indexOf(sortBy) === -1) {
    throw new Error(`There is no sort option just like ${sortBy}`);
  }

  await dispatch({
    type: SET_TRANSLATIONS_SORT_BY,
    payload: sortBy,
  });
};

export const setOrder = (order) => async (dispatch) => dispatch({type: SET_TRANSLATIONS_ORDER, payload: order === ASC_ORDER || order === DESC_ORDER ? order : DEFAULT_ORDER});

export const setLimit = (limit) => async (dispatch) => dispatch({type: SET_TRANSLATIONS_LIMIT, payload: limit});

export const toggleMode = () => async (dispatch) => dispatch({type: TOGGLE_MODE});

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


const handleTranslationUpdate = (getState, dispatch, translationId, collectionId, action=CHECK) => {
  if(!checkType('number', translationId, collectionId)) {
    throw new Error('Translation and collection has to be type of number');
  };

  if(action !== CHECK || action !== DELETE){
    throw new Error('Invalid action type');
  }

  const {auth:{token}, translations:{translations, collection:{id: cId}}} = getState();

  try{
    const response = await updateCollectionRequest(token, {action, collectionId, translationId});

    if(!(checkType('object', response) && response.isUpdated)) {
      throw new Error(`Translation have not been ${action}ed`);
    };
  
    const {isUpdated, id} = response;
  
    // const translationsWithoutDeleted = translations.map(item=>item.id !== id);
  
    await dispatch({type: action === DELETE ? DELETE_TRANSLATION : CHECK_TRANSLATION, payload: {id}});

    return getState().translations.translations;

  }catch(err){
    console.error(err)

    return;
  }
}
