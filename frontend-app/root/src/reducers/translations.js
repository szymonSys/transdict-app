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
      return { ...state, translations: [...state.translations, ...payload] };
    case ADD_TRANSLATION:
      return {
        ...state,
        translations: [...state.translations, { ...payload }],
      };
    case DELETE_TRANSLATION:
      const translationsWithoutDeleted = state.translations.filter(
        (translation) => translation.id !== payload.id
      );
      return { ...state, translations: translationsWithoutDeleted };
    case CHECK_TRANSLATION:
      const translations = state.translations.map((translation) =>
        translation.id === payload.id
          ? { ...translation, isLearned: !translation.isLearned }
          : translation
      );
      return { ...state, translations };
    case CLEAR_TRANSLATIONS:
      return { ...state, translations: [] };
    case GET_TRANSLATIONS_IDS:
      return { ...state, ids: [...payload] };
    case SHUFFLE_TRANSLATIONS_IDS:
      return { ...state, ids: [...payload] };
    case CLEAR_TRANSLATIONS_IDS:
      return { ...state, ids: [] };
    case SET_TRANSLATIONS_SORT_BY:
      return { ...state, sortBy: payload };
    case SET_TRANSLATIONS_LIMIT:
      return { ...state, limit: payload };
    case SET_TRANSLATIONS_ORDER:
      return { ...state, order: payload };
    case SET_COLLECTION_DATA:
      return { ...state, collection: { ...payload } };
    case TOGGLE_LEARNED:
      const { onlyLearned, onlyUnlearned } = payload;
      return { ...state, onlyLearned, onlyUnlearned };
    case TOGGLE_MODE:
      const { isFlashcardMode, isDictMode } = state;
      return {
        ...state,
        isDictMode: !isDictMode,
        isFlashcardMode: !isFlashcardMode,
      };
    case RESET_TRANSLATIONS_STORE:
      return defaultState;
    default:
      return state;
  }
}
