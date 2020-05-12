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
