import React, { useState, useCallback } from "react";

export function useValue(defaultState = "") {
  const [value, setValue] = useState(defaultState);

  const handle = useCallback((e) => {
    const target = e.target;
    setValue(target.value);
  }, []);

  const resetValue = useCallback(() => setValue(defaultState), []);

  return [value, handle, resetValue];
}

export function useSubmit(callback) {
  return useCallback((e, ...args) => {
    e.preventDefault();
    return callback(...args);
  }, []);
}

export function useCheck(options = { withRadio: false }) {
  const { withRadio } = options;
  const [values, setValues] = useState(!withRadio ? [] : {});

  const handle = useCallback((e) => {
    if (!(e?.target?.type === "checkbox" || e?.target?.type === "radio"))
      return;

    const target = e.target;

    if (!target.checked && target.type === "checkbox") {
      setValues((prevState) =>
        Array.isArray(prevState)
          ? [...prevState.filter((item) => item[target.name] !== target.value)]
          : prevState
      );
    } else if (target.checked) {
      const newItem = { [target.name]: target.value };

      setValues((prevState) =>
        target.type === "checkbox" && Array.isArray(prevState)
          ? [...prevState, newItem]
          : newItem
      );
    }
  }, []);

  const reset = useCallback(() => (!withRadio ? [] : {}), []);

  return [values, handle, reset];
}
