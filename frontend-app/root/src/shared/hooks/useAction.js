import { useEffect } from "react";

const useAction = (actionCallback, deps = []) =>
  useEffect(() => {
    typeof actionCallback === "function" &&
      Array.isArray(deps) &&
      actionCallback();
  }, deps);

export default useAction;
