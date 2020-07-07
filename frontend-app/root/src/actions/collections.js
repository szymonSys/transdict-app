import {
  addCollection as addCollectionRequest,
  deleteCollection as deleteCollectionRequest,
  getUserCollections as getUserCollectionsRequest,
} from "../services/transdict-API/requests";

import { checkType } from "../shared/utils";

import {
  UPDATE_COLLECTIONS,
  CLEAR_COLLECTIONS,
  SET_ORDER,
  SET_LIMIT,
  SET_SORT_BY,
} from "./types";

import {
  // SORT_DEFAULT,
  // SORT_BY_CREATED_AT,
  // SORT_BY_ID,
  // SORT_BY_LEARNED,
  // SORT_BY_NAME,
  // SORT_BY_TRANSLATIONS,
  // SORT_BY_UPDATED_AT,
  SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
  ASC_ORDER,
  DESC_ORDER,
} from "../services/transdict-API/actionsTypes";

import { createMessage, MESSAGE_TYPES } from "./messages";

const { SORT_DEFAULT } = SORT_OPTIONS;

export const getUserCollections = ({
  sortBy = SORT_DEFAULT,
  sortDirection = DEFAULT_ORDER,
  limit = DEFAULT_LIMIT,
} = {}) => async (dispatch, getState) => {
  const token = getState().auth.token;

  //   const response = await getUserCollectionsRequest(getState().auth.token, {
  //     limit,
  //     offset = Array.isArray(getState().collections) ? getState().collections.length : 0,
  //     sortBy,
  //     sortDirection,
  //   });

  //   if (!Boolean(response?.contentIsSent)) {
  //     throw new Error("Collections have not been sent!");
  //   }

  //   const collections = response?.collections ? response.collections : [];

  //   await dispatch({ type: GET_COLLECTIONS, payload: collections });

  //   return getState().collections;

  return handleGetCollections(token, dispatch, {
    offset: (offset = Array.isArray(getState().collections)
      ? getState().collections.length
      : 0),
    limit,
    sortBy,
    sortDirection,
  });
};

export const addCollection = (collectionName) => async (dispatch, getState) => {
  if (!checkType("string", collectionName)) {
    throw new Error("collectionName param has to be string");
  }

  const token = getState().auth.token;

  const response = await addCollectionRequest(token, dispatch, {
    collectionName,
  });

  if (!Boolean(response?.isAdded)) {
    throw new Error("Collection has not been added!");
  } else {
    return handleGetCollections(token, {
      offset: 0,
      limit: Array.isArray(getState().collections)
        ? getState().collections.length
        : DEFAULT_LIMIT,
      sortBy: SORT_DEFAULT,
      sortDirection: DEFAULT_ORDER,
    });
  }

  // try{
  //   const response = await getUserCollectionsRequest(getState().auth.token, {
  //     offset: 0,
  //     limit: Array.isArray(getState().collections) ? getState().collections.length : DEFAULT_LIMIT,
  //     sortBy: BY_DEFAULT,
  //     sortDirection: DEFAULT_ORDER
  //   });

  //   if (!Boolean(response?.contentIsSent)) {
  //     throw new Error("Collections have not been sent!");
  //   }

  //   const collections = response?.collections ? response.collections : [];

  //   await dispatch({ type: GET_COLLECTIONS, payload: collections });

  //   return getState().collections;

  // } catch(err){
  //   console.error(err)
  // }
};

export const deleteCollection = (collectionId) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;

  const response = await deleteCollectionRequest(token, {
    collectionId,
  });

  if (!Boolean(response?.isDeleted)) {
    throw new Error("Collection has not been deleted!");
  } else {
    return handleGetCollections(token, dispatch, {
      offset: 0,
      limit: Array.isArray(getState().collections)
        ? getState().collections.length
        : DEFAULT_LIMIT,
      sortBy: SORT_DEFAULT,
      sortDirection: DEFAULT_ORDER,
    });
  }
};

const setOrder = (order) => async (dispatch) => {
  await dispatch({
    type: SET_ORDER,
    payload:
      order === ASC_ORDER || order === DESC_ORDER ? order : DEFAULT_ORDER,
  });
};

const setLimit = (limit) => async (dispatch) => {
  await dispatch({
    type: SET_LIMIT,
    payload: limit,
  });
};

const setSortBy = (order) => async (dispatch) => {
  if (Object.values(SORT_OPTIONS).indexOf(order) === -1) {
    throw new Error(`There is no sort option just like ${order}`);
  }

  await dispatch({
    type: SET_SORT_BY,
    payload: order,
  });
};

async function handleGetCollections(
  token,
  dispatch,
  {
    offset = Array.isArray(getState().collections)
      ? getState().collections.length
      : 0,
    limit = DEFAULT_LIMIT,
    sortBy = SORT_DEFAULT,
    sortDirection = DEFAULT_ORDER,
  } = {}
) {
  try {
    const response = await getUserCollectionsRequest(token, {
      offset,
      limit,
      sortBy,
      sortDirection,
    });

    if (!Boolean(response?.contentIsSent)) {
      throw new Error("Collections have not been sent!");
    }

    const collections = response?.collections ? response.collections : [];

    await dispatch({ type: UPDATE_COLLECTIONS, payload: collections });

    return getState().collections;
  } catch (err) {
    console.error(err);
  }
}
