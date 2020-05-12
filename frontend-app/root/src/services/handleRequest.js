import { checkType, handleFetch } from "../shared/utils";

export default function handleRequest(
  url,
  { method = "GET", token = null, APIkey = null, requestData = {} } = {}
) {
  if (!checkType("string", url, method))
    throw new Error("invalid argument in handleRequest function");

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
  };

  if (checkType("string", token)) {
    headers["x-access-token"] = token;
  }

  if (checkType("string", APIkey)) {
    headers["Ocp-Apim-Subscription-Key"] = APIkey;
  }

  const requestOptions = {
    method: method.toUpperCase(),
    headers,
    redirect: "follow",
  };

  if (method !== "GET") {
    requestOptions.body = JSON.stringify(requestData);
  }

  return handleFetch(url, requestOptions);
}
