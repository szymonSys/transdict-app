import { useRef, useEffect } from "react";

export default function Language({ children, languageKey, languageName }) {
  const ref = useRef();

  const setRef = (node) => (ref.current = node);

  useEffect(() => {
    ref.current.dataset.languageKey = languageKey;
    ref.current.dataset.languageName = languageName;
  }, []);

  return children(setRef);
}
