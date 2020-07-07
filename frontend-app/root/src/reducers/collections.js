import {
  UPDATE_COLLECTIONS,
  CLEAR_COLLECTIONS,
  SET_SORT_BY,
  SET_LIMIT,
  SET_ORDER,
} from "../actions/types";

import {
  BY_DEFAULT,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
} from "../services/transdict-API/actionsTypes";

const initialState = {
  sortBy: BY_DEFAULT,
  sortDirection: DEFAULT_ORDER,
  limit: DEFAULT_LIMIT,
  collections: [],
};

export default function (state = { ...initialState }, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_COLLECTIONS:
      return { ...state, collections: [...state.collections, payload] };
    case CLEAR_COLLECTIONS:
      return { ...state, collections: [] };
    case SET_SORT_BY:
      return { ...state, sortBy: payload };
    case SET_LIMIT:
      return { ...state, limit: payload };
    case SET_ORDER:
      return { ...state, sortDirection: payload };
    default:
      return state;
  }
}
