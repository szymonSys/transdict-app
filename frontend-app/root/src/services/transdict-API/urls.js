import { checkType } from "../../shared/utils";
import {
  CHECK_TRANSLATION,
  DELETE_TRANSLATION,
  BY_DEFAULT,
} from "./actionsTypes";

export const getSignUpURL = () => "/sign-up";

export const getLoginURL = () => "/login";

export const getLogoutURL = () => "/logout";

export const getUserURL = () => "/user";

export const getNewCollectionURL = () => "/user/collections/new";

export const getUpdateCollectionsURL = ({
  collectionName = null,
  collectionId = null,
  translationId = null,
  action = null,
} = {}) => {
  if (
    !checkType("string", collectionName, action) ||
    collectionName === "" ||
    action === "" ||
    (!checkType("number", collectionId, translationId) &&
      (action === DELETE_TRANSLATION || action === CHECK_TRANSLATION))
  ) {
    throw new Error("invalid parameter in getUserCollectionsURL function");
  }

  return `/user/collections/${collectionName}/update?action=${action}&collectionId=${
    collectionId || ""
  }&translationId=${translationId || ""}`;
};

export const getDeleteCollectionURL = ({
  collectionName = null,
  collectionId = null,
} = {}) => {
  if (
    !checkType("number", collectionId) ||
    !checkType("string", collectionName) ||
    collectionName === ""
  ) {
    throw new Error("invalid parameter in deleteCollectionURL function");
  }

  return `/user/collections/${collectionName}/delete/?collectionId=${collectionId}`;
};

export const getUserCollectionsURL = ({
  limit = 10,
  offset = 0,
  sortBy = BY_DEFAULT,
} = {}) => {
  if (
    !checkType("number", limit, offset) ||
    !checkType("string", sortBy) ||
    sortBy === ""
  ) {
    throw new Error("invalid parameter in getUserCollectionsURL function");
  }

  return `/user/collections?limit=${limit}&offset=${offset}&sortBy=${sortBy}`;
};

export const getTranslationFromCollectionURL = ({
  collectionId = null,
  collectionName = null,
  limit = 10,
  offset = 0,
  sortBy = BY_DEFAULT,
} = {}) => {
  if (
    !checkType("number", limit, offset, collectionId) ||
    !checkType("string", sortBy, collectionName) ||
    sortBy === "" ||
    collectionName === ""
  ) {
    throw new Error(
      "invalid parameter in getTranslationFromCollectionURL function"
    );
  }

  return `/user/collections/${collectionName}?collectionId=${collectionId}&limit=${limit}&offset=${offset}&sortBy=${sortBy}`;
};

export default {
  getLoginURL,
  getLogoutURL,
  getSignUpURL,
  getTranslationFromCollectionURL,
  getUpdateCollectionsURL,
  getUserCollectionsURL,
  getUserURL,
};
