export const checkType = (type, ...variables) => {
  if (!variables.length && typeof type !== "string") {
    throw new Error("invalid argument in checkType function");
  }
  return !variables.some((variable) => typeof variable !== type);
};

export async function handleFetch(url, requestOptions) {
  try {
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}

export const setUrlParams = (params = {}) => {
  if (!checkType("object", params))
    throw Error("params must be type of object");

  const urlArgsString = Object.keys(params).reduce(
    (acumulator, currentKey) =>
      (acumulator +=
        (checkType("string", params[currentKey]) ||
          checkType("boolean", params[currentKey]) ||
          checkType("number", params[currentKey])) &&
        params[currentKey] !== ""
          ? `&${currentKey}=${params[currentKey]}`
          : ""),
    ""
  );

  return urlArgsString;
};
