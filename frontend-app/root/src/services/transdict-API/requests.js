import handleRequest from "../handleRequest";
import {
  CHECK_TRANSLATION,
  ADD_TRANSLATION,
  DELETE_TRANSLATION,
  BY_DEFAULT,
  DEFAULT_ORDER,
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
} from "./urls";

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
  { action = null, collectionId = null } = {},
  {
    translationId = null,
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

export function addCollection(
  token = null,
  { collectionName: name = null } = {}
) {
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

export function getUserCollections(
  token = null,
  {
    limit = 20,
    offset = 0,
    sortBy = BY_DEFAULT,
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
    sortBy = BY_DEFAULT,
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
