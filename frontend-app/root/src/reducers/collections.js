import {
  UPDATE_COLLECTIONS,
  CLEAR_COLLECTIONS,
  RESET_COLLECTIONS_STORE,
  SET_COLLECTIONS_SORT_BY,
  SET_COLLECTIONS_LIMIT,
  SET_COLLECTIONS_ORDER,
  DELETE_COLLECTION,
  ADD_COLLECTION,
  CLEAR_IDS_WITH_FORWARD_TRANSLATION,
  SET_IDS_WITH_FORWARD_TRANSLATION,
} from "../actions/types";

import {
  COLLECTIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
} from "../services/transdict-API/actionsTypes";

const { SORT_DEFAULT } = COLLECTIONS_SORT_OPTIONS;

const initialState = {
  collectionsWithTranslationData: {
    isSent: false,
    ids: {},
  },
  collections: [],
  collectionsQuantity: null,
  sortBy: SORT_DEFAULT,
  sortDirection: DEFAULT_ORDER,
  limit: DEFAULT_LIMIT,
};

export default function (state = { ...initialState }, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: [...state.collections, ...payload.collections],
        collectionsQuantity: payload.collectionsQuantity,
      };
    case ADD_COLLECTION:
      return {
        ...state,
        collections: [{ ...payload }, ...state.collections],
        collectionsQuantity: state.collectionsQuantity + 1,
      };
    case DELETE_COLLECTION:
      const collectionsWithoutDeleted = state.collections.filter(
        (collection) => collection.id !== payload.id
      );
      return {
        ...state,
        collections: collectionsWithoutDeleted,
        collectionsQuantity: state.collectionsQuantity - 1,
      };
    case CLEAR_COLLECTIONS:
      return { ...state, collections: [] };
    case SET_COLLECTIONS_SORT_BY:
      return { ...state, sortBy: payload };
    case SET_COLLECTIONS_LIMIT:
      return { ...state, limit: payload };
    case SET_COLLECTIONS_ORDER:
      return { ...state, sortDirection: payload };
    case RESET_COLLECTIONS_STORE:
      return { ...initialState };
    case SET_IDS_WITH_FORWARD_TRANSLATION:
      return {
        ...state,
        collectionsWithTranslationData: { isSent: true, ids: payload.ids },
      };
    case CLEAR_IDS_WITH_FORWARD_TRANSLATION:
      return {
        ...state,
        collectionsWithTranslationData: { isSent: false, ids: {} },
      };
    default:
      return state;
  }
}
