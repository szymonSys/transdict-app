import { useState, useEffect } from "react";
import { checkType } from "../utils";
import { translate as translateRequest } from "../../actions/phrases";
import store from "../../store";

const { score, ...initialTranslateValues } = store.getState().phrases;

const {
  translation: storeTranslation,
  phrase: storePhrase,
  from: storeFrom,
  to: storeTo,
} = initialTranslateValues;

export default function useTranslate(
  initialValues = initialTranslateValues,
  callback = null
) {
  const [translateValues, setTranslateValues] = useState(
    checkInitialValues(initialValues)
  );

  const { phrase, translation, from, to } = translateValues;

  const [isLoading, setLoading] = useState(false);

  const setState = (newState) =>
    setTranslateValues((prevState) => setValues(prevState, newState));

  const translate = async () => {
    const [translateProps, isValid] = valid(translateValues);
    if (isValid) {
      setLoading(true);
      await translateRequest(translateProps);
      checkType("function", callback) && callback();
    } else {
      console.log("translate props is not valid");
    }
  };

  useEffect(() => {
    isLoading ? setLoading(false) : translate();
    // !isLoading && translate();
  }, [phrase, translation, from, to]);

  useEffect(() => {
    setState(initialTranslateValues);
    // isLoading && setLoading(false);
  }, [storePhrase, storeTranslation, storeFrom, storeTo, score]);

  return { translateValues, isLoading, setState, translate };
}

const checkValue = (object, key) =>
  key in object && (checkType("string", object[key]) || object[key] === null);

const checkInitialValues = (values) =>
  checkType("object", values) &&
  values !== null &&
  Object.keys(initialTranslateValues).every((key) => checkValue(values, key))
    ? values
    : { ...initialTranslateValues };

const setValues = (prevValues, newValues) => {
  if (!checkType("object", newValues) || newValues === null)
    throw new Error("newValues has to be type of object");
  return Object.entries(newValues).reduce(
    (values, entrie) =>
      checkValue(prevValues, entrie[0])
        ? { ...values, [entrie[0]]: entrie[1] }
        : values,
    {}
  );
};

const valid = (props) => {
  const entries = Object.entries(props).reduce(
    (validatedProps, entry) =>
      entry[0] === "translation" || (entry[1] === null && entry[0] !== "from")
        ? validatedProps
        : [...validatedProps, [entry[0], entry[1]]],
    []
  );

  const isValid = entries.every((entrie) => entrie[1] !== "");

  return [Object.fromEntries(entries), isValid];
};
