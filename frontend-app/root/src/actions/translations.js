import {
  getTranslationsFromCollection as getTranslationsFromCollectionRequest,
  getTranslationsByIds as getTranslationsByIdsRequest,
  getAllTranslationsIds as getAllTranslationsIdsRequest,
  updateCollection as updateCollectionRequest,
  getAllTranslationsIds,
} from "../services/transdict-API/requests";

import {
  UPDATE_TRANSLATIONS,
  ADD_TRANSLATION,
  DELETE_TRANSLATION,
  CHECK_TRANSLATION,
  CLEAR_TRANSLATIONS,
  GET_TRANSLATIONS_IDS,
  SHUFFLE_TRANSLATIONS_IDS,
  CLEAR_TRANSLATIONS_IDS,
  TOGGLE_MODE,
  SET_TRANSLATIONS_SORT_BY,
  SET_TRANSLATIONS_LIMIT,
  SET_TRANSLATIONS_ORDER,
  SET_COLLECTION_DATA,
  TOGGLE_LEARNED,
  RESET_TRANSLATIONS_STORE,
} from "../actions/types";

import {
  CHECK_TRANSLATION as CHECK,
  ADD_TRANSLATION as ADD,
  DELETE_TRANSLATION as DELETE,
  TRANSLATIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
  ASC_ORDER,
  DESC_ORDER,
} from "../services/transdict-API/actionsTypes";

import { createMessage, MESSAGE_TYPES } from "./messages";

import { checkType, shuffle } from "../shared/utils";

const { SORT_DEFAULT } = TRANSLATIONS_SORT_OPTIONS;

export const getTranslations = (collectionId) => async (dispatch, getState) => {
  const {
    auth: { token },
    translations: {
      translations: currentTranslations,
      collection,
      limit,
      sortDirection,
      sortBy,
      isDictMode,
    },
  } = getState();

  try {
    if (!isDictMode) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsMsg",
          `App has to be in Dict Mode to get translations with limit and offset`
        )
      );
      throw new Error(
        "App has to be in Dict Mode to get translations with limit and offset"
      );
    }

    const response = await getTranslationsFromCollectionRequest(token, {
      collectionId,
      limit,
      offset: currentTranslations.length,
      sortBy,
      sortDirection,
    });

    const { collectionData, translations, isSent } = response;

    if (!isSent) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsMsg",
          `Translations have not been updated`
        )
      );

      throw new Error("Translations have not been sent");
    }

    await setCollectionDataHelper(
      collectionData,
      compareCollectionData(collection, collectionData),
      dispatch
    );

    await dispatch({
      type: UPDATE_TRANSLATIONS,
      payload: Array.isArray(translations) ? [...translations] : [],
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.success,
        "translationsMsg",
        `Translations have been updated`
      )
    );

    return getState().translations.translations;
  } catch (err) {
    console.log(err);

    return;
  }
};

export const getTranslationsIds = (
  collectionId,
  { all = true, onlyLearned = false } = {}
) => async (dispatch, getState) => {
  const {
    auth: { token },
    translations: {
      collection,
      isFlashcardMode,
      onlyLearned: currentOnlyLearned,
      onlyUnlearned: currentOnlyUnlearned,
    },
  } = getState();

  const areLearned = all ? null : onlyLearned ? true : false;

  try {
    if (!isFlashcardMode) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsIdsMsg",
          `App has to be in Flashcard Mode to get all translations ids`
        )
      );
      throw new Error(
        "App has to be in Flashcard Mode to get all translations ids"
      );
    }

    const response = await getAllTranslationsIdsRequest(token, {
      collectionId,
      areLearned,
    });

    const {
      collectionData,
      translationsIds: ids,
      areLearned: areLearnedFromResponse,
      isSent,
    } = response;

    if (!isSent) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsIdsMsg",
          `Translations ids have not been sent`
        )
      );

      throw new Error("Translations ids have not been sent");
    }

    await setCollectionDataHelper(
      collectionData,
      compareCollectionData(collection, collectionData),
      dispatch
    );

    if (areLearnedFromResponse !== currentOnlyLearned) {
      await dispatch({
        type: TOGGLE_LEARNED,
        payload: setLearnedHelper(all, areLearnedFromResponse),
      });

      dispatch(
        createMessage(
          MESSAGE_TYPES.info,
          "translationsIsLearnedMsg",
          `Translations isLearned status has been toggled`
        )
      );
    }

    await dispatch({
      type: GET_TRANSLATIONS_IDS,
      payload: Array.isArray(ids) ? shuffle(ids) : [],
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.success,
        "translationsIdsMsg",
        `Translations ids have been set`
      )
    );

    return getState().translations.ids;
  } catch (err) {
    console.error(err);

    return;
  }
};

export const getTranslationsByIds = (collectionId, quantity = 5) => async (
  dispatch,
  getState
) => {
  try {
    const {
      auth: { token },
      translations: { translations: currentTranslations, ids, isFlashcardMode },
    } = getState();

    if (!isFlashcardMode) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsMsg",
          `App has to be in Flashcard Mode to get translations by ids`
        )
      );

      throw new Error(
        "App has to be in Flashcard Mode to get translations by ids"
      );
    }

    const translationsQuantity = currentTranslations.length;

    const translationsIds = ids.slice(
      translationsQuantity,
      translationsQuantity + 5
    );

    const response = await getTranslationsByIdsRequest(token, {
      collectionId,
      translationsIds,
    });

    const { translations, isSent } = response;

    if (!isSent) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsMsg",
          `Translations have not been sent`
        )
      );

      throw new Error("Translations have not been sent");
    }

    await dispatch({
      type: UPDATE_TRANSLATIONS,
      payload: Array.isArray(translations) ? [...translations] : [],
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.success,
        "translationsMsg",
        `Translations have been sent`
      )
    );

    return getState().translations.translations;
  } catch (err) {
    console.error(err);

    return;
  }
};

export const shuffleTranslationsIds = () => async (dispatch, getState) => {
  const {
    translations: { ids },
  } = getState();

  await dispatch({ type: SHUFFLE_TRANSLATIONS_IDS, payload: shuffle(ids) });

  dispatch(
    createMessage(
      MESSAGE_TYPES.info,
      "translationsIdsShuffleMsg",
      `Translations ids have been shuffled`
    )
  );

  return getState().translations.ids;
};

export const deleteTranslation = ({
  translationId = null,
  collectionId = null,
} = {}) => async (dispatch, getState) =>
  handleTranslationUpdate(
    getState,
    dispatch,
    translationId,
    collectionId,
    DELETE
  );

export const checkTranslation = ({
  translationId = null,
  collectionId = null,
} = {}) => async (dispatch, getState) =>
  handleTranslationUpdate(
    getState,
    dispatch,
    translationId,
    collectionId,
    CHECK
  );

export const addTranslation = (
  { collectionId = null } = {},
  {
    primaryPhrase = null,
    secondaryPhrase = null,
    primaryLanguage = null,
    secondaryLanguage = null,
  } = {}
) => async (dispatch, getState) => {
  try {
    if (
      !(
        checkType("number", collectionId) &&
        checkType(
          "string",
          primaryPhrase,
          secondaryPhrase,
          primaryLanguage,
          secondaryLanguage
        )
      )
    ) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsAddMsg",
          `Collection id has to be type of number, all new translation parameters have to be type of string`
        )
      );

      throw new Error(
        "Collection id has to be type of number, all new translation parameters have to be type of string"
      );
    }

    const {
      auth: { token },
    } = getState();
    const response = await updateCollectionRequest(
      token,
      { collectionId, action: ADD },
      { primaryPhrase, secondaryPhrase, primaryLanguage, secondaryLanguage }
    );

    const { isUpdated, newTranslation, message } = response;

    if (!(isUpdated && checkType("object", newTranslation))) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsAddMsg",
          checkType("string", message)
            ? message
            : `Translation has not been added`
        )
      );

      throw new Error(
        checkType("string", message)
          ? message
          : "Translation has not been added"
      );
    }

    if (
      Object.values(newTranslation).some(
        (value) => value === undefined || value === null
      )
    ) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsAddMsg",
          checkType("string", message)
            ? message
            : `Invalid type of responded new translation value`
        )
      );

      throw new Error(
        checkType("string", message)
          ? message
          : "Invalid type of responded new translation value"
      );
    }

    await dispatch({ type: ADD_TRANSLATION, payload: newTranslation });

    dispatch(
      createMessage(
        MESSAGE_TYPES.success,
        "translationsAddMsg",
        checkType("string", message) ? message : `Translation has been added`
      )
    );

    return getState().translations.translations;
  } catch (err) {
    console.error(err);
  }
};

export const clearTranslations = () => async (dispatch) =>
  dispatch({ type: CLEAR_TRANSLATIONS });

export const clearTranslationsIds = () => async (dispatch) =>
  dispatch({ type: CLEAR_TRANSLATIONS_IDS });

export const resetTranslationsStore = () => async (dispatch) =>
  dispatch({ type: RESET_TRANSLATIONS_STORE });

export const setSortBy = (sortBy) => async (dispatch, getState) => {
  if (getState().translations.sortBy === sortBy) return;

  try {
    if (Object.values(TRANSLATIONS_SORT_OPTIONS).indexOf(sortBy) === -1) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsSortByMsg",
          `There is no sort option just like ${sortBy}`
        )
      );

      throw new Error(`There is no sort option just like ${sortBy}`);
    }

    await dispatch({
      type: SET_TRANSLATIONS_SORT_BY,
      payload: sortBy,
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.info,
        "translationsSortByMsg",
        `Translations have been sorted by ${sortBy}`
      )
    );
  } catch (err) {
    console.error(err);
  }
};

export const toggleOrder = () => async (dispatch, getState) => {
  const {
    translations: { sortDirection },
  } = getState();
  return dispatch({
    type: SET_TRANSLATIONS_ORDER,
    payload: sortDirection === ASC_ORDER ? DESC_ORDER : ASC_ORDER,
  });
};

export const setLimit = (limit) => async (dispatch, getState) =>
  getState().translations.limit === limit
    ? undefined
    : dispatch({ type: SET_TRANSLATIONS_LIMIT, payload: limit });

export const toggleMode = () => async (dispatch) =>
  dispatch({ type: TOGGLE_MODE });

export const setCollectionData = ({
  name,
  id,
  createdAt,
  updatedAt,
  translationsQuantity,
  learnedQuantity,
} = {}) => async (dispatch, getState) => {
  const payload = {
    name,
    id,
    createdAt,
    updatedAt,
    translationsQuantity,
    learnedQuantity,
  };

  if (
    !Object.values(payload).every(
      (value) => checkType("string", value) || checkType("number", value)
    )
  ) {
    dispatch(
      createMessage(
        MESSAGE_TYPES.fail,
        "collectionDataMsg",
        `Invalid collection parameters`
      )
    );

    throw new Error("Invalid collection parameters");
  }

  try {
    await dispatch({ type: SET_COLLECTION_DATA, payload });

    dispatch(
      createMessage(
        MESSAGE_TYPES.info,
        "collectionDataMsg",
        `Collection data has been set`
      )
    );

    return getState().translations.collection;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const setLearned = ({ all = true, onlyLearned = false } = {}) => async (
  dispatch
) => {
  try {
    if (!all && !checkType("boolean", onlyLearned)) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsIsLearnedMsg",
          `Parameters of setLearned function have to be type of boolean`
        )
      );

      throw new Error(
        "Parameters of setLearned function have to be type of boolean"
      );
    }

    await dispatch({
      type: TOGGLE_LEARNED,
      payload: setLearnedHelper(all, onlyLearned),
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.info,
        "translationsIsLearnedMsg",
        `Translations isLearned status has been toggled`
      )
    );
  } catch (err) {
    console.error(err);
  }
};

const setLearnedHelper = (all, onlyLearned) =>
  all
    ? { onlyLearned: false, onlyUnlearned: false }
    : { onlyLearned, onlyUnlearned: !onlyLearned };

const handleTranslationUpdate = async (
  getState,
  dispatch,
  translationId,
  collectionId,
  action
) => {
  try {
    if (!checkType("number", translationId, collectionId)) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsUpdateMsg",
          `Translation and collection has to be type of number`
        )
      );

      throw new Error("Translation and collection has to be type of number");
    }

    if (!(action === CHECK || action === DELETE)) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsUpdateMsg",
          `Invalid action type`
        )
      );

      throw new Error("Invalid action type");
    }

    const {
      auth: { token },
      translations: {
        translations,
        collection: { id: cId },
      },
    } = getState();
    const response = await updateCollectionRequest(token, {
      action,
      collectionId,
      translationId,
    });

    if (!(checkType("object", response) && response.isUpdated)) {
      dispatch(
        createMessage(
          MESSAGE_TYPES.fail,
          "translationsUpdateMsg",
          `Translation have not been ${action}ed`
        )
      );

      throw new Error(`Translations have not been ${action}ed`);
    }

    const { isUpdated, id } = response;

    await dispatch({
      type: action === DELETE ? DELETE_TRANSLATION : CHECK_TRANSLATION,
      payload: { id },
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.success,
        "translationsUpdateMsg",
        `Translation has been ${action}ed`
      )
    );

    return getState().translations.translations;
  } catch (err) {
    console.error(err);

    return;
  }
};

async function setCollectionDataHelper(
  collectionData,
  collectionsAreDifferent,
  dispatch
) {
  if (collectionsAreDifferent) {
    await dispatch({
      type: SET_COLLECTION_DATA,
      payload: collectionData,
    });

    dispatch(
      createMessage(
        MESSAGE_TYPES.info,
        "CollectionDataMsg",
        `Collection data has been updated`
      )
    );
  }
}

const compareCollectionData = (storageCollection, responseCollection) =>
  checkType("object", storageCollection) &&
  Object.entries(storageCollection).some(
    (entry) => entry[1] !== responseCollection[entry[0]]
  );
