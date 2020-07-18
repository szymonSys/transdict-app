import { useState, useEffect, useCallback, useRef } from "react";
import { checkType } from "../utils";

const useInfiniteScroll = (actionCallback, executionOptions) => {
  const ref = useRef();

  const intersectionObserver = useRef();

  const { condition, deps } = executionOptions;

  const [shouldExecute, setShouldExecute] = useState(
    checkType("function", condition) ? condition() : !!condition
  );

  useEffect(
    () => {
      setShouldExecute(
        checkType("function", condition) ? condition() : !!condition
      );
    },
    Array.isArray(deps) ? deps : []
  );

  const handleScroll = useCallback(
    (node) => {
      if (!checkType("function", actionCallback)) {
        throw new Error("Invalid argument");
      }

      intersectionObserver.current && intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver(([entrie]) => {
        entrie.intersectionRatio > 0 && !!shouldExecute && actionCallback();
      });

      if (node && shouldExecute) intersectionObserver.current.observe(node);
    },
    [shouldExecute]
  );

  useEffect(() => {
    handleScroll(ref.current);
  }, [shouldExecute]);

  return ref;
};

export default useInfiniteScroll;
