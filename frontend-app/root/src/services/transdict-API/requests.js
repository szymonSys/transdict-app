import handleRequest from "../handleRequest";

import {
  CHECK_TRANSLATION,
  ADD_TRANSLATION,
  DELETE_TRANSLATION,
  TRANSLATIONS_SORT_OPTIONS,
  COLLECTIONS_SORT_OPTIONS,
  DEFAULT_ORDER,
  DEFAULT_LIMIT,
} from "./actionsTypes";

import {
  getLoginURL,
  getLogoutURL,
  getSignUpURL,
  getTranslationsFromCollectionURL,
  getTranslationsByIdsURL,
  getUpdateCollectionsURL,
  getUserCollectionsURL,
  getDeleteCollectionURL,
  getNewCollectionURL,
  getUserURL,
  getAllTranslationsIdsURL,
  getCollectionsWithForwardTranslationIdsURL,
} from "./urls";

const { SORT_DEFAULT: SORT_TRANSLATIONS_DEFAULT } = TRANSLATIONS_SORT_OPTIONS;
const { SORT_DEFAULT: SORT_COLLECTIONS_DEFAULT } = COLLECTIONS_SORT_OPTIONS;

export function login(email = null, password = null) {
  return handleRequest(getLoginURL(), {
    method: "POST",
    requestData: { email, password },
  });
}

export function logout(token = null) {
  return handleRequest(getLogoutURL(), { token });
}

export function register(email = null, password = null) {
  return handleRequest(getSignUpURL(), {
    method: "POST",
    requestData: { email, password },
  });
}

export function authenticate(token = null) {
  return handleRequest(getUserURL(), { token });
}

export function updateCollection(
  token = null,
  { action = null, collectionId = null, translationId = null } = {},
  {
    primaryPhrase = null,
    secondaryPhrase = null,
    primaryLanguage = null,
    secondaryLanguage = null,
  } = {}
) {
  return handleRequest(
    getUpdateCollectionsURL({
      collectionId,
      translationId,
      action,
    }),
    {
      method: setHttpMethod(action),
      token,
      requestData: {
        primaryPhrase,
        secondaryPhrase,
        primaryLanguage,
        secondaryLanguage,
      },
    }
  );
}

export function addCollection(token = null, { name = null } = {}) {
  return handleRequest(getNewCollectionURL(), {
    method: "POST",
    token,
    requestData: { name },
  });
}

export function deleteCollection(token = null, { collectionId = null } = {}) {
  return handleRequest(getDeleteCollectionURL({ collectionId }), {
    method: "DELETE",
    token,
  });
}

export function getCollectionsWithForwardTranslationIds(
  token = null,
  {
    primaryPhrase = null,
    secondaryPhrase = null,
    primaryLanguage = null,
    secondaryLanguage = null,
  } = {}
) {
  return handleRequest(getCollectionsWithForwardTranslationIdsURL(), {
    token,
    method: "POST",
    requestData: {
      primaryPhrase,
      primaryLanguage,
      secondaryPhrase,
      secondaryLanguage,
    },
  });
}

export function getUserCollections(
  token = null,
  {
    limit = DEFAULT_LIMIT,
    offset = 0,
    sortBy = SORT_COLLECTIONS_DEFAULT,
    sortDirection = DEFAULT_ORDER,
  } = {}
) {
  return handleRequest(
    getUserCollectionsURL({ limit, offset, sortBy, sortDirection }),
    {
      token,
    }
  );
}

export function getTranslationsFromCollection(
  token = null,
  {
    collectionId = null,
    limit = 10,
    offset = 0,
    sortBy = SORT_TRANSLATIONS_DEFAULT,
    sortDirection = DEFAULT_ORDER,
  } = {}
) {
  return handleRequest(
    getTranslationsFromCollectionURL({
      collectionId,
      limit,
      offset,
      sortBy,
      sortDirection,
    }),
    { method: "GET", token }
  );
}

export function getTranslationsByIds(
  token = null,
  { collectionId = null, translationsIds = [] } = {}
) {
  return handleRequest(getTranslationsByIdsURL({ collectionId }), {
    method: "POST",
    token,
    requestData: { translationsIds },
  });
}

export function getAllTranslationsIds(
  token = null,
  { collectionId = null, areLearned = null } = {}
) {
  return handleRequest(getAllTranslationsIdsURL({ collectionId, areLearned }), {
    token,
  });
}

const setHttpMethod = (action) => {
  switch (action) {
    case ADD_TRANSLATION:
      return "POST";
    case CHECK_TRANSLATION:
      return "PUT";
    case DELETE_TRANSLATION:
      return "DELETE";
    default:
      return "GET";
  }
};
