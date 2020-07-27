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

const initialState = {
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

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_TRANSLATIONS:
      return { ...state, translations: [...state.translations, ...payload] };
    case ADD_TRANSLATION:
      console.log(payload);
      return {
        ...state,
        translations: [{ ...payload }, ...state.translations],
        collection: {
          ...state.collection,
          translationsQuantity: state.collection.translationsQuantity + 1,
        },
      };
    case DELETE_TRANSLATION:
      const translationsWithoutDeleted = state.translations.filter(
        (translation) => translation.id !== payload.id
      );
      return {
        ...state,
        translations: translationsWithoutDeleted,
        collection: {
          ...state.collection,
          translationsQuantity: state.collection.translationsQuantity - 1,
        },
      };
    case CHECK_TRANSLATION:
      let newLearnedQuantity = 0;

      const translations = state.translations.map((translation) => {
        if (translation.id !== payload.id) return translation;

        translation.isLearned ? newLearnedQuantity-- : newLearnedQuantity++;

        return { ...translation, isLearned: !translation.isLearned };
      });

      return {
        ...state,
        translations,
        collection: {
          ...state.collection,
          learnedQuantity:
            state.collection.learnedQuantity + newLearnedQuantity,
        },
      };
    case CLEAR_TRANSLATIONS:
      return { ...state, translations: [] };
    case GET_TRANSLATIONS_IDS:
      return { ...state, translations: [], ids: [...payload] };
    case SHUFFLE_TRANSLATIONS_IDS:
      return { ...state, ids: [...payload] };
    case CLEAR_TRANSLATIONS_IDS:
      return { ...state, ids: [] };
    case SET_TRANSLATIONS_SORT_BY:
      return { ...state, sortBy: payload };
    case SET_TRANSLATIONS_LIMIT:
      return { ...state, limit: payload };
    case SET_TRANSLATIONS_ORDER:
      return { ...state, sortDirection: payload };
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
        translations: [],
      };
    case RESET_TRANSLATIONS_STORE:
      return { ...initialState };
    default:
      return state;
  }
}
