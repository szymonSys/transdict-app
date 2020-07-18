export const CHECK_TRANSLATION = "check";
export const ADD_TRANSLATION = "add";
export const DELETE_TRANSLATION = "delete";

export const UPDATED_AT = "updatedAt";
export const CREATED_AT = "createdAt";
export const COLLECTION_NAME = "name";
export const PRIMARY_LANGUAGE = "primaryLanguage";
export const SECONDARY_LANGUAGE = "secondaryLanguage";
export const BY_DEFAULT = CREATED_AT;

export const ASC_ORDER = "ASC";
export const DESC_ORDER = "DESC";
export const DEFAULT_ORDER = ASC_ORDER;
export const DEFAULT_LIMIT = 10;

export const COLLECTIONS_SORT_OPTIONS = Object.freeze({
  SORT_BY_NAME: "name",
  SORT_BY_TRANSLATIONS: "translationsQuantity",
  SORT_BY_LEARNED: "learnedQuantity",
  SORT_BY_CREATED_AT: "createdAt",
  SORT_BY_UPDATED_AT: "updatedAt",
  SORT_BY_ID: "id",
  SORT_DEFAULT: "id",
});

export const TRANSLATIONS_SORT_OPTIONS = Object.freeze({
  SORT_BY_PRIMARY_PHRASE: "primaryPhrase",
  SORT_BY_SECONDARY_PHRASE: "secondaryPhrase",
  SORT_BY_CREATED_AT: "createdAt",
  SORT_BY_UPDATED_AT: "updatedAt",
  SORT_BY_ID: "id",
  SORT_DEFAULT: "id",
});

// export const SORT_BY_NAME = "name";
// export const SORT_BY_TRANSLATIONS = "translationsQuantity";
// export const SORT_BY_LEARNED = "learnedQuantity";
// export const SORT_BY_CREATED_AT = "createdAt";
// export const SORT_BY_UPDATED_AT = "updatedAt";
// export const SORT_BY_ID = "id";
// export const SORT_DEFAULT = SORT_BY_ID;
