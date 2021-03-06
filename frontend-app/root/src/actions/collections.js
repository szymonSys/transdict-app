import { createMessage, MESSAGE_TYPES } from "./messages";
import { checkType } from "../shared/utils";

import {
  addCollection as addCollectionRequest,
  deleteCollection as deleteCollectionRequest,
  getUserCollections as getUserCollectionsRequest,
  getCollectionsWithForwardTranslationIds as getCollectionsWithForwardTranslationIdsRequest,
} from "../services/transdict-API/requests";

import {
  UPDATE_COLLECTIONS,
  RESET_COLLECTIONS_STORE,
  SET_COLLECTIONS_SORT_BY,
  SET_COLLECTIONS_LIMIT,
  SET_COLLECTIONS_ORDER,
  DELETE_COLLECTION,
  ADD_COLLECTION,
  CLEAR_COLLECTIONS,
  SET_IDS_WITH_FORWARD_TRANSLATION,
  CLEAR_IDS_WITH_FORWARD_TRANSLATION,
} from "./types";

import {
  COLLECTIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
  ASC_ORDER,
  DESC_ORDER,
} from "../services/transdict-API/actionsTypes";

const { SORT_DEFAULT } = COLLECTIONS_SORT_OPTIONS;

export const getUserCollections = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  const { sortBy, limit, sortDirection, collections } = getState().collections;

  return handleGetCollections(token, dispatch, getState, {
    offset: Array.isArray(collections) ? collections.length : 0,
    limit,
    sortBy,
    sortDirection,
  });
};

export const clearCollectionsWithForwardTranslationIds = () => (dispatch) =>
  dispatch({ type: CLEAR_IDS_WITH_FORWARD_TRANSLATION });

export const getCollectionsWithForwardTranslationIds = () => async (
  dispatch,
  getState
) => {
  const {
    auth: { token },
    phrases: { score, isLoading, autoTranslation, ...currentTranslation },
  } = getState();

  const { phrase, from, to, translation } = currentTranslation;

  try {
    if (
      Object.values(currentTranslation).some(
        (value) => !checkType("string", value) || value === ""
      )
    )
      throw new Error("Invalid argument of translation props");

    const response = await getCollectionsWithForwardTranslationIdsRequest(
      token,
      {
        primaryLanguage: from,
        secondaryLanguage: to,
        primaryPhrase: phrase,
        secondaryPhrase: translation,
      }
    );

    const { contentIsSent, ...collectionsWithTranslationData } = response;

    if (!contentIsSent) {
      throw new Error("Collections ids has not been sent!");
    } else {
      await dispatch({
        type: SET_IDS_WITH_FORWARD_TRANSLATION,
        payload: collectionsWithTranslationData,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const addCollection = (collectionName) => async (dispatch, getState) => {
  try {
    if (!checkType("string", collectionName)) {
      throw new Error("collectionName param has to be string");
    }

    const token = getState().auth.token;
    const response = await addCollectionRequest(token, {
      name: collectionName,
    });

    const { isAdded, newCollection } = response;

    if (!Boolean(isAdded)) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "collectionAddMsg",
          `Collection has not been added`
        )
      );

      throw new Error("Collection has not been added!");
    } else {
      await dispatch({ type: ADD_COLLECTION, payload: newCollection });

      dispatch(
        createMessage(
          MESSAGE_TYPES.success,
          "collectionAddMsg",
          `Collection ${newCollection.name} has been added`
        )
      );
      return getState().collections.collections;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteCollection = (collectionId) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;

  try {
    const response = await deleteCollectionRequest(token, {
      collectionId,
    });

    const {
      isDeleted,
      deletedCollectionName,
      deletedCollectionId: id,
    } = response;

    if (!Boolean(isDeleted)) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "collectionDeleteMsg",
          `Collection has not been deleted`
        )
      );

      throw new Error("Collection has not been deleted!");
    } else {
      await dispatch({ type: DELETE_COLLECTION, payload: { id } });

      dispatch(
        createMessage(
          MESSAGE_TYPES.success,
          "collectionDeleteMsg",
          `Collection ${deletedCollectionName} has been deleted`
        )
      );
    }
  } catch (err) {
    console.error(err);
  }
};

export const toggleOrder = () => async (dispatch, getState) => {
  const {
    collections: { sortDirection },
  } = getState();

  return dispatch({
    type: SET_COLLECTIONS_ORDER,
    payload: sortDirection === ASC_ORDER ? DESC_ORDER : ASC_ORDER,
  });
};

export const setLimit = (limit) => async (dispatch) => {
  await dispatch({
    type: SET_COLLECTIONS_LIMIT,
    payload: limit,
  });
  dispatch(
    createMessage(
      MESSAGE_TYPES.info,
      "collectionsLimitMsg",
      `Fetching collections limit is ${limit}`
    )
  );
};

export const setSortBy = (sortBy) => async (dispatch) => {
  try {
    if (Object.values(COLLECTIONS_SORT_OPTIONS).indexOf(sortBy) === -1) {
      throw new Error(`There is no sort option just like ${sortBy}`);
    }

    await dispatch({
      type: SET_COLLECTIONS_SORT_BY,
      payload: sortBy,
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.info,
        "collectionsSortMsg",
        `Sort collections by ${sortBy}`
      )
    );
  } catch (err) {
    console.error(err);
  }
};

export const clearCollections = () => (dispatch) =>
  dispatch({ type: CLEAR_COLLECTIONS });

export const resetCollectionsStore = () => (dispatch) =>
  dispatch({ type: RESET_COLLECTIONS_STORE });

async function handleGetCollections(
  token,
  dispatch,
  getState,
  {
    offset = 0,
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
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "collectionsUpdateMsg",
          `Collections have not been updated`
        )
      );
      throw new Error("Collections have not been sent!");
    }

    const { collections, collectionsQuantity } = response;

    await dispatch({
      type: UPDATE_COLLECTIONS,
      payload: {
        collections: Array.isArray(collections) ? collections : [],
        collectionsQuantity,
      },
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.success,
        "collectionsUpdateMsg",
        `Collections have been updated`
      )
    );

    return getState().collections;
  } catch (err) {
    console.error(err);
  }
}
