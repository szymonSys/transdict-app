import {
  UPDATE_COLLECTIONS,
  CLEAR_COLLECTIONS,
  SET_COLLECTIONS_SORT_BY,
  SET_COLLECTIONS_LIMIT,
  SET_COLLECTIONS_ORDER,
} from "../actions/types";

import {
  COLLECTIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
} from "../services/transdict-API/actionsTypes";

const { SORT_DEFAULT } = COLLECTIONS_SORT_OPTIONS;

const initialState = {
  collections: [],
  sortBy: SORT_DEFAULT,
  sortDirection: DEFAULT_ORDER,
  limit: DEFAULT_LIMIT,
};

export default function (state = { ...initialState }, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_COLLECTIONS:
      return { ...state, collections: [...state.collections, payload] };
    case CLEAR_COLLECTIONS:
      return { ...state, collections: [] };
    case SET_COLLECTIONS_SORT_BY:
      return { ...state, sortBy: payload };
    case SET_COLLECTIONS_LIMIT:
      return { ...state, limit: payload };
    case SET_COLLECTIONS_ORDER:
      return { ...state, sortDirection: payload };
    default:
      return state;
  }
}
