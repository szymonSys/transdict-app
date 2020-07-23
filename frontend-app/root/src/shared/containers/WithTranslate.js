import useTranslate from "../hooks/useTranslate";

export default function WithTranslate({ children }) {
  const {
    translateValues,
    isLoading,
    setState: setTranslateValues,
    translate,
  } = useTranslate();
  return children({
    translateValues,
    isLoading,
    setTranslateValues,
    translate,
  });
}
