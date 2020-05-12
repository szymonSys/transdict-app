import handleRequest from "../handleRequest";
import {
  CHECK_TRANSLATION,
  ADD_TRANSLATION,
  DELETE_TRANSLATION,
  BY_DEFAULT,
} from "./actionsTypes";
import {
  getLoginURL,
  getLogoutURL,
  getSignUpURL,
  getTranslationFromCollectionURL,
  getUpdateCollectionsURL,
  getUserCollectionsURL,
  getDeleteCollectionURL,
  getNewCollectionURL,
  getUserURL,
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
  action = null,
  { collectionId = null, collectionName = null, translationId = null } = {},
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
      collectionName,
      translationId,
      action,
    }),
    {
      method: _setMethod(action),
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

export function deleteCollection(
  token = null,
  { collectionId = null, collectionName = null } = {}
) {
  return handleRequest(
    getDeleteCollectionURL({ collectionId, collectionName }),
    {
      method: "DELETE",
      token,
    }
  );
}

export function getUserCollections(
  token = null,
  { limit = 10, offset = 0, sortBy = BY_DEFAULT } = {}
) {
  return handleRequest(getUserCollectionsURL({ limit, offset, sortBy }), {
    token,
  });
}

export function getTranslationsFromCollection(
  token = null,
  {
    collectionId = null,
    collectionName = null,
    limit = 10,
    offset = 0,
    sortBy = BY_DEFAULT,
  } = {}
) {
  return handleRequest(
    getTranslationFromCollectionURL({
      collectionId,
      collectionName,
      limit,
      offset,
      sortBy,
    }),
    { token }
  );
}

const _setMethod = (action) => {
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
