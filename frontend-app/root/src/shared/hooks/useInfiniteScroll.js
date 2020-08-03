import { useState, useEffect, useCallback, useRef } from "react";
import { checkType } from "../utils";

const useInfiniteScroll = (actionCallback, executionOptions) => {
  const ref = useRef();

  const intersectionObserver = useRef();

  const { condition, deps, withPreload } = executionOptions;

  const [isLoading, setLoading] = useState(false);

  const [isPreloaded, setIsPreloaded] = useState(!withPreload);

  const [shouldExecute, setShouldExecute] = useState(
    checkType("function", condition) ? condition() : !!condition
  );

  const handlePreload = useCallback(() => {
    setLoading(true);
    actionCallback();
    setIsPreloaded(true);
  }, []);

  const handleScroll = useCallback(
    async (node) => {
      if (!checkType("function", actionCallback)) {
        throw new Error("Invalid argument");
      }

      intersectionObserver.current && intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver(([entrie]) => {
        if (entrie.isIntersecting && !!shouldExecute) {
          setLoading(true);
          actionCallback();
        }
      });

      if (node && shouldExecute) intersectionObserver.current.observe(node);
    },
    [shouldExecute]
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

  useEffect(() => {
    setIsPreloaded(!withPreload);
  }, [withPreload]);

  useEffect(() => {
    !isPreloaded ? handlePreload() : handleScroll(ref.current);
    return () =>
      intersectionObserver.current && intersectionObserver.current.disconnect();
  }, [shouldExecute, isPreloaded]);

  return [ref, isLoading];
};

export default useInfiniteScroll;
