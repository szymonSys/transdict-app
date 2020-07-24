import useTranslate from "../hooks/useTranslate";

export default function WithTranslate({ children, callback }) {
  const {
    translateValues,
    isLoading,
    setState: setTranslateValues,
    translate,
  } = useTranslate(callback);
  return children({
    translateValues,
    isLoading,
    setTranslateValues,
    translate,
  });
}
