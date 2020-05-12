import { useEffect, useState } from "react";
import { authenticate } from "../actions/auth";
import store from "../store";

export function useLoad(
  { callback = null, initState = false, deps = [] } = {},
  ...args
) {
  const [isLoaded, setIsLoaded] = useState(initState);
  useEffect(() => {
    if (typeof callback === "function") {
      callback(...args);
    }
    setIsLoaded(true);
  }, deps);
  return isLoaded;
}

export function useAuthentication() {
  return useLoad(
    {
      callback: store.dispatch,
      initState: store.getState().auth.isAuthenticated,
    },
    authenticate()
  );
}

export function useMediaQuery(
  query,
  defaultMatches = window.matchMedia(query).matches
) {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.remveListener(listener);
  }, [query, matches]);

  return matches;
}
