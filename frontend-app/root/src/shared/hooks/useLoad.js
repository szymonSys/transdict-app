import { useEffect, useState } from "react";

export default function useLoad(
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
