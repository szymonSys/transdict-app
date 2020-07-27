import { useRef, useEffect } from "react";

export default function usePrevious(state) {
  const prevStateRef = useRef();
  useEffect(() => {
    prevStateRef.current = state;
  });
  const prevState = prevStateRef.current;
  return prevState;
}
