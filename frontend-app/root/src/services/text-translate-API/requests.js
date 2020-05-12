import handleRequest from "../handleRequest";
import { getLanguagesURL, getTranslateURL } from "./urls";

const API_KEY = "5cd67da6280248cdbea841eb6bdca4d2";

export const getLanguages = () =>
  handleRequest(getLanguagesURL(), { APIkey: API_KEY });

export const translate = (
  text,
  params = { to: null, from: null, toScript: null }
) => {
  return handleRequest(getTranslateURL({ ...params }), {
    method: "POST",
    APIkey: API_KEY,
    requestData: [{ Text: text }],
  });
};
