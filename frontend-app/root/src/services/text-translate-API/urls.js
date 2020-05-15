import { checkType, setUrlParams } from "../../shared/utils";
const BASE_URL = "https://api.cognitive.microsofttranslator.com";
const API_VERSION = "3.0";

const setToPattern = (path = "languages", rest = "") =>
  `${BASE_URL}/${path}?api-version=${API_VERSION}${rest}`;

export const getLanguagesURL = () => setToPattern();

export const getTranslateURL = (
  params = { to: null, from: null, toScript: "Latn" }
) => setToPattern("translate", setUrlParams({ ...params }));
