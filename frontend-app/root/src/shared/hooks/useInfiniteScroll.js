import { useState, useEffect, useCallback, useRef } from "react";
import { checkType } from "../utils";

const useInfiniteScroll = (actionCallback, executionOptions) => {
  const ref = useRef();

  const intersectionObserver = useRef();

  const { condition, deps, withPreload } = executionOptions;

  const isPreloadedRef = useRef(!withPreload);

  const { current: isPreloaded } = isPreloadedRef;

  const [isLoading, setLoading] = useState(false);

  const [shouldExecute, setShouldExecute] = useState(
    checkType("function", condition) ? condition() : !!condition
  );

  useEffect(
    () => {
      setShouldExecute(
        checkType("function", condition) ? condition() : !!condition
      );
      isLoading && setLoading(false);
    },
    Array.isArray(deps) ? deps : []
  );

  const handleScroll = useCallback(
    async (node) => {
      if (!checkType("function", actionCallback)) {
        throw new Error("Invalid argument");
      }

      intersectionObserver.current && intersectionObserver.current.disconnect();

      if (!isPreloaded) {
        await actionCallback();
        isPreloadedRef.current = true;
      }

      intersectionObserver.current = new IntersectionObserver(([entrie]) => {
        if (entrie.intersectionRatio > 0 && !!shouldExecute) {
          setLoading(true);
          actionCallback();
        }
      });

      if (node && shouldExecute) intersectionObserver.current.observe(node);
    },
    [shouldExecute]
  );

  useEffect(() => {
    handleScroll(ref.current);
    return () =>
      intersectionObserver.current && intersectionObserver.current.disconnect();
  }, [shouldExecute]);

  return [ref, isLoading];
};

export default useInfiniteScroll;
