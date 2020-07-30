import { useEffect, useRef } from "react";
import { checkType } from "../utils";
import usePrevious from "../hooks/usePrevious";
import {
  translate as translateAction,
  setPhrases as setPhrasesAction,
  resetPhrase as resetPhraseAction,
} from "../../actions/phrases";
import store from "../../store";

export default function useTranslate(phrases, callback = null) {
  const {
    phrase,
    translation,
    from,
    to,
    isLoading,
    autoTranslation,
    score,
  } = phrases;

  const prevPhrases = usePrevious({ ...phrases });

  const timeoutIdRef = useRef();

  const setPhraseProps = async (newState) => {
    await store.dispatch(setPhrasesAction(newState));
  };

  const translate = async () => {
    const [translateProps, isValid] = valid(phrases);

    if (isValid) {
      const {
        phrase: text,
        from: fromLanguage,
        to: toLanguage,
      } = translateProps;

      await store.dispatch(
        translateAction(text, {
          fromLanguage,
          toLanguage,
          toScript: null,
        })
      );

      checkType("function", callback) && callback();
    } else {
      console.log("translate props is not valid");
    }
  };

  useEffect(() => {
    if (
      !isLoading &&
      checkType("string", translation, phrase) &&
      (translation === prevPhrases?.translation ||
        prevPhrases?.translation === phrase) &&
      (!(prevPhrases.autoTranslation && !autoTranslation) ||
        prevPhrases?.from === from) &&
      prevPhrases?.score === score
    ) {
      translate();
    }
  }, [from, to]);

  useEffect(() => {
    if ((!isLoading && prevPhrases?.from === from) || prevPhrases?.to === to) {
      timeoutIdRef.current && clearTimeout(timeoutIdRef.current);

      if (to && phrase !== prevPhrases?.phrase) {
        timeoutIdRef.current = setTimeout(translate, 1000);
      }
    }
  }, [phrase]);

  return {
    translateValues: phrases,
    isLoading,
    setPhraseProps,
    translate,
  };
}

const valid = (props) => {
  const entries = Object.entries(props).reduce(
    (validatedProps, [key, value]) =>
      key === "translation" ||
      key === "score" ||
      key === "autoTranslation" ||
      key === "isLoading" ||
      (value === null && key !== "from")
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
