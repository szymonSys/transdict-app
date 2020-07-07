import handleRequest from "../handleRequest";
import { getLanguagesURL, getTranslateURL } from "./urls";

const API_KEY = "adfba2915b5a496e831b9ba576bb3f65";
const REGION = "westeurope";

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
