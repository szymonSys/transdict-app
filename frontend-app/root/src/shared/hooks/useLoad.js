import { useEffect, useState, useCallback } from "react";
import store from "../../store";

export default function useLoad(
  { callback = null, initState = false, deps = [] } = {},
  ...args
) {
  const [isLoaded, setIsLoaded] = useState(initState);

  const load = useCallback(async (...args) => {
    await callback(...args);
    setIsLoaded(true);
  }, args);

  const resetLoad = useCallback(() => setIsLoaded(false), []);

  useEffect(() => {
    if (typeof callback === "function") {
      load(...args);
    }
  }, deps);
  return [isLoaded, load, resetLoad];
}
