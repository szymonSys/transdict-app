import { useState, useEffect, useRef } from "react";
import { checkType } from "../utils";
import usePrevious from "../hooks/usePrevious";
import { translate as translateAction } from "../../actions/phrases";
import store from "../../store";

const { score, ...initialTranslateValues } = store.getState().phrases;

export default function useTranslate(
  callback = null,
  initialValues = initialTranslateValues
) {
  const [translateValues, setTranslateValues] = useState(
    checkInitialValues(initialValues)
  );

  const [isLoading, setLoading] = useState(false);

  const prevState = usePrevious({ ...translateValues });

  const { phrase, translation, from, to } = translateValues;

  const setState = (newState) =>
    setTranslateValues((prevState) => setValues(prevState, newState));

  const timeoutIdRef = useRef();

  const translate = async () => {
    const [translateProps, isValid] = valid(translateValues);
    if (isValid) {
      const {
        phrase: text,
        from: fromLanguage,
        to: toLanguage,
      } = translateProps;
      setLoading(true);
      await store.dispatch(
        translateAction(text, {
          fromLanguage,
          toLanguage,
          toScript: null,
        })
      );
      const { from, ...restValues } = store.getState().phrases;
      setState(restValues);
      checkType("function", callback) && callback();
    } else {
      console.log("translate props is not valid");
    }
  };

  useEffect(() => {
    isLoading && setLoading(false);
  }, [isLoading]);

  useEffect(() => {
    if (
      (prevState?.to !== to || prevState?.from !== from) &&
      checkType("string", translation, phrase)
    ) {
      translate();
    } else if (prevState?.phrase !== phrase) {
      timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
      if (to && phrase !== initialTranslateValues.phrase) {
        timeoutIdRef.current = setTimeout(translate, 2000);
      }
    }
  }, [from, to, phrase]);

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
    (values, [key, value]) =>
      checkValue(prevValues, key) ? { ...values, [key]: value } : values,
    prevValues
  );
};

const valid = (props) => {
  const entries = Object.entries(props).reduce(
    (validatedProps, [key, value]) =>
      key === "translation" || (value === null && key !== "from")
        ? validatedProps
        : [...validatedProps, [key, value]],
    []
  );

  const isValid = entries.every(([key, value]) => {
    const valueIsString = checkType("string", value);

    if (valueIsString && value !== "") return true;

    if (!valueIsString && value === null)
      return key === "translation" || key === "from" ? true : false;

    return false;
  });

  return [Object.fromEntries(entries), isValid];
};
