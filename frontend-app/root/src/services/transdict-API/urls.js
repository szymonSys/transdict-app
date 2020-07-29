import { checkType, setUrlParams } from "../../shared/utils";
import {
  CHECK_TRANSLATION,
  DELETE_TRANSLATION,
  BY_DEFAULT,
  DEFAULT_ORDER,
} from "./actionsTypes";

const setToPattern = (path, args) => {
  if (!checkType("string", path, args))
    throw Error("path and args must be the string");
  return `${path}?${args}`;
};

export const getSignUpURL = () => "/sign-up";

export const getLoginURL = () => "/login";

export const getLogoutURL = () => "/logout";

export const getUserURL = () => "/user";

export const getNewCollectionURL = () => "/user/collections/new";

export const getCollectionsWithForwardTranslationIdsURL = () =>
  "/user/collections/with-translation";

export const getUpdateCollectionsURL = (
  params = { collectionId: null, translationId: null, action: null }
) => setToPattern("/user/collections/update", setUrlParams({ ...params }));

export const getDeleteCollectionURL = (params = { collectionId: null }) =>
  setToPattern("/user/collections/delete", setUrlParams({ ...params }));

export const getUserCollectionsURL = (
  params = {
    limit: 10,
    offset: 0,
    sortBy: BY_DEFAULT,
    sortDirection: DEFAULT_ORDER,
  }
) => setToPattern("/user/collections", setUrlParams({ ...params }));

export const getTranslationsFromCollectionURL = (
  params = {
    collectionId: null,
    limit: 10,
    offset: 0,
    sortBy: BY_DEFAULT,
    sortDirection: DEFAULT_ORDER,
  }
) => setToPattern("/user/collection/translations", setUrlParams({ ...params }));

export const getTranslationsByIdsURL = (
  params = {
    collectionId: null,
  }
) => setToPattern("/user/translations", setUrlParams({ ...params }));

export const getAllTranslationsIdsURL = (
  params = {
    collectionId: null,
    areLearned: null,
  }
) =>
  setToPattern("/user/collection/translationsIds", setUrlParams({ ...params }));

export default {
  getLoginURL,
  getLogoutURL,
  getSignUpURL,
  getTranslationsFromCollectionURL,
  getTranslationsByIdsURL,
  getUpdateCollectionsURL,
  getUserCollectionsURL,
  getUserURL,
  getAllTranslationsIdsURL,
};
