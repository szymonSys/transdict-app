import { useEffect } from "react";
import store from "../../store";

const useMessage = (
  messageName,
  deleteCallback,
  timeout,
  deps = [],
  messagesState = store.getState().messages
) => {
  useEffect(
    () => {
      messagesState[messageName] && setTimeout(deleteCallback, timeout);
    },
    Array.isArray(deps) ? deps : []
  );

  return messagesState[messageName];
};

export default useMessage;
