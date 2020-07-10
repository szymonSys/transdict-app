import {
  UPDATE_TRANSLATIONS,
  ADD_TRANSLATION,
  DELETE_TRANSLATION,
  CHECK_TRANSLATION,
  CLEAR_TRANSLATIONS,
  GET_TRANSLATIONS_IDS,
  SHUFFLE_TRANSLATIONS_IDS,
  CLEAR_TRANSLATIONS_IDS,
  SET_TRANSLATIONS_SORT_BY,
  SET_TRANSLATIONS_LIMIT,
  SET_TRANSLATIONS_ORDER,
  SET_COLLECTION_DATA,
  TOGGLE_LEARNED,
  RESET_TRANSLATIONS_STORE,
  TOGGLE_MODE,
} from "../actions/types";

import {
  TRANSLATIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
} from "../services/transdict-API/actionsTypes";

const { SORT_DEFAULT } = TRANSLATIONS_SORT_OPTIONS;

const defaultState = {
  ids: [],
  translations: [],
  collection: {
    name: null,
    id: null,
    translationsQuantity: null,
    learnedQuantity: null,
    createdAt: null,
    updatedAt: null,
  },
  isFlashcardMode: false,
  onlyLearned: false,
  onlyUnlearned: false,
  isDictMode: true,
  sortBy: SORT_DEFAULT,
  sortDirection: DEFAULT_ORDER,
  limit: DEFAULT_LIMIT,
};

export default function (state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_TRANSLATIONS:
      return {};
    case ADD_TRANSLATION:
      return {};
    case DELETE_TRANSLATION:
      return {};
    case CHECK_TRANSLATION:
      return {};
    case CLEAR_TRANSLATIONS:
      return {};
    case GET_TRANSLATIONS_IDS:
      return {};
    case SHUFFLE_TRANSLATIONS_IDS:
      return {};
    case CLEAR_TRANSLATIONS_IDS:
      return {};
    case SET_TRANSLATIONS_SORT_BY:
      return {};
    case SET_TRANSLATIONS_LIMIT:
      return {};
    case SET_TRANSLATIONS_ORDER:
      return {};
    case SET_COLLECTION_DATA:
      return {};
    case TOGGLE_LEARNED:
      return {};
    case RESET_TRANSLATIONS_STORE:
      return {};
    case TOGGLE_MODE:
      return {};
    default:
      return state;
  }
}
