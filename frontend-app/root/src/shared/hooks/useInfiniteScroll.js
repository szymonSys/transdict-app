import { useState, useEffect, useCallback, useRef } from "react";
import { checkType } from "../utils";

const useInfiniteScroll = (actionCallback, executionOptions) => {
  const ref = useRef();

  const intersectionObserver = useRef();

  const { condition, deps } = executionOptions;

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
    (node) => {
      if (!checkType("function", actionCallback)) {
        throw new Error("Invalid argument");
      }

      intersectionObserver.current && intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver(
        async ([entrie]) => {
          if (entrie.intersectionRatio > 0 && !!shouldExecute) {
            setLoading(true);
            actionCallback();
            // setTimeout(actionCallback, 300);
            // await Promise.resolve().then(() => setTimeout(actionCallback, 300));
          }
        }
      );

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
