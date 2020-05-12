import { checkType } from "../../shared/utils";
const BASE_URL = "https://api.cognitive.microsofttranslator.com";
const API_VERSION = "3.0";

const setToPattern = (path = "languages", rest = "") =>
  `${BASE_URL}/${path}?api-version=${API_VERSION}${rest}`;

const setParams = (params = {}) => {
  if (!checkType("object", params))
    throw Error("params must be type of object");

  const urlArgsString = Object.keys(params).reduce(
    (acumulator, currentKey) =>
      (acumulator +=
        checkType("string", params[currentKey]) && params[currentKey] !== ""
          ? `&${currentKey}=${params[currentKey]}`
          : ""),
    ""
  );

  return urlArgsString;
};

export const getLanguagesURL = () => setToPattern();

export const getTranslateURL = (
  params = { to: null, from: null, toScript: "Latn" }
) => setToPattern("translate", setParams({ ...params }));
