import {
  addCollection as addCollectionRequest,
  deleteCollection as deleteCollectionRequest,
  getUserCollections as getUserCollectionsRequest,
} from "../services/transdict-API/requests";

import {
  UPDATE_COLLECTIONS,
  CLEAR_COLLECTIONS,
  RESET_COLLECTIONS_STORE,
  SET_COLLECTIONS_SORT_BY,
  SET_COLLECTIONS_LIMIT,
  SET_COLLECTIONS_ORDER,
} from "./types";

import {
  COLLECTIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
  ASC_ORDER,
  DESC_ORDER,
} from "../services/transdict-API/actionsTypes";

import { createMessage, MESSAGE_TYPES } from "./messages";

import { checkType } from "../shared/utils";

const { SORT_DEFAULT } = COLLECTIONS_SORT_OPTIONS;

export const getUserCollections = ({
  sortBy = SORT_DEFAULT,
  sortDirection = DEFAULT_ORDER,
  limit = DEFAULT_LIMIT,
} = {}) => async (dispatch, getState) => {
  const token = getState().auth.token;

  return handleGetCollections(token, dispatch, getState, {
    offset: Array.isArray(getState().collections)
      ? getState().collections.length
      : 0,
    limit,
    sortBy,
    sortDirection,
  });
};

export const addCollection = (collectionName) => async (dispatch, getState) => {
  try {
    if (!checkType("string", collectionName)) {
      throw new Error("collectionName param has to be string");
    }

    const token = getState().auth.token;
    const response = await addCollectionRequest(token, dispatch, {
      collectionName,
    });

    const { isAdded, newCollectionName } = response;

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
      dispatch(
        createMessage(
          MESSAGE_TYPES.success,
          "collectionAddMsg",
          `Collection ${newCollectionName} has been added`
        )
      );

      return handleGetCollections(token, getState, {
        offset: 0,
        limit: Array.isArray(getState().collections)
          ? getState().collections.length
          : DEFAULT_LIMIT,
        sortBy: SORT_DEFAULT,
        sortDirection: DEFAULT_ORDER,
      });
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

    const { isDeleted, deletedCollectionName } = response;

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
      dispatch(
        createMessage(
          MESSAGE_TYPES.success,
          "collectionDeleteMsg",
          `Collection ${deletedCollectionName} has been deleted`
        )
      );

      return handleGetCollections(token, dispatch, getState, {
        offset: 0,
        limit: Array.isArray(getState().collections)
          ? getState().collections.length
          : DEFAULT_LIMIT,
        sortBy: SORT_DEFAULT,
        sortDirection: DEFAULT_ORDER,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const toggleOrder = () => async (dispatch, getState) => {
  const {
    collections: { sortDirection },
  } = getState();

  await dispatch({
    type: SET_COLLECTIONS_ORDER,
    payload: sortDirection === ASC_ORDER ? DESC_ORDER : ASC_ORDER,
  });
  dispatch(
    createMessage(
      MESSAGE_TYPES.info,
      "collectionsOrderMsg",
      `Fetching collections order is ${getState().collections.sortDirection}`
    )
  );
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

    const collections = response?.collections ? response.collections : [];

    await dispatch({ type: UPDATE_COLLECTIONS, payload: collections });

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
