import { useState, useCallback, useEffect } from "react";

export default function useSwitch(defaultState = [null, null]) {
  if (!Array.isArray(defaultState) || defaultState.length !== 2)
    defaultState = [null, null];

  const [state, setState] = useState([...defaultState]);
  const [shouldReverse, setShouldReverse] = useState(false);

  const reverse = useCallback(
    () => setState((prevState) => [prevState[1], prevState[0]]),
    []
  );

  const setNewState = useCallback(
    (newState) =>
      Array.isArray(newState) &&
      newState.length === 2 &&
      setState([...newState]),
    []
  );

  // useEffect(() => {
  //   setState(defaultState);
  // }, [defaultState[0], defaultState[1]]);

  return [state, reverse, setNewState];
}
