import handleRequest from "../handleRequest";
import { getLanguagesURL, getTranslateURL } from "./urls";
import { KEY, REGION } from "../../text-translation-api-key.json";

const API_KEY = "";
// const REGION = "westeurope";

export const getLanguages = () =>
  handleRequest(getLanguagesURL(), { APIkey: API_KEY, region: REGION });

export const translate = (
  text,
  params = { to: null, from: null, toScript: null }
) => {
  return handleRequest(getTranslateURL({ ...params }), {
    method: "POST",
    APIkey: API_KEY,
    region: REGION,
    requestData: [{ Text: text }],
  });
};
