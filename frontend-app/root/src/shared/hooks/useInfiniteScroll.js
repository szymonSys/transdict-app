import { useEffect, useCallback, useRef } from "react";

const useInfiniteScroll = (actionCallback, shouldExecute) => {
  const ref = useRef();

  const intersectionObserver = useRef();

  const handleScroll = useCallback(
    (node) => {
      if (typeof actionCallback !== "function")
        throw new Error("Invalid argument");

      intersectionObserver.current && intersectionObserver.current.disconnect();

      intersectionObserver.current = new IntersectionObserver(([entrie]) => {
        entrie.intersectionRatio > 0 && !!shouldExecute && actionCallback();
      });

      if (node) intersectionObserver.current.observe(node);
    },
    [shouldExecute]
  );

  useEffect(() => {
    handleScroll(ref.current);
  }, [shouldExecute]);

  return ref;
};

export default useInfiniteScroll;
