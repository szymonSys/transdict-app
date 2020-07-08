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
  TRANSLATIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
} from "../services/transdict-API/actionsTypes";

const { SORT_DEFAULT } = TRANSLATIONS_SORT_OPTIONS;

const defaultState = {
  ids: [],
  translations: [],
  isFlashcardMode: false,
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
    case SET_FLASHCARD_MODE:
      return {};
    case SET_DICT_MODE:
      return {};
    case SET_TRANSLATIONS_SORT_BY:
      return {};
    case SET_TRANSLATIONS_LIMIT:
      return {};
    case SET_TRANSLATIONS_ORDER:
      return {};
    default:
      return state;
  }
}
