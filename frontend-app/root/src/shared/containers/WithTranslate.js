import { useLocation } from "react-router-dom";
import useTranslate from "../hooks/useTranslate";

export default function WithTranslate({ children, callback, phrases }) {
  const location = useLocation();

  const {
    translateValues,
    isLoading,
    setPhraseProps: setTranslateValues,
    translate,
  } = useTranslate(phrases, { callback });

  const handleChange = (event) => {
    const newTranslateValues = { phrase: event.target.value };
    if (!event.target.value?.length && translateValues.translation?.length) {
      newTranslateValues.translation = "";
    }
    if (translateValues.autoTranslation && translateValues.from !== null) {
      newTranslateValues.from = null;
      newTranslateValues.autoTranslation = false;
    }
    setTranslateValues(newTranslateValues);
  };

  return children({
    translateValues,
    isLoading,
    setTranslateValues,
    handleChange,
  });
}
