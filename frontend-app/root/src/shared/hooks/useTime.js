import React, { useState, useCallback } from "react";

export function useTimeout(callback = () => {}) {
  const [callbackId, setCallbackId] = useState(null);

  const handler = useCallback((options = { delay: 0 }, ...args) => {
    Array.isArray(args) &&
      setCallbackId(setTimeout(() => callback(...args), options.delay));
  }, []);

  const clear = useCallback(() => setCallbackId(clearTimeout(callbackId)), [
    callbackId,
  ]);

  return [handler, clear, callbackId];
}
