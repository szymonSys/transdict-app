import { useState, useCallback } from "react";

export default function useSwitch(defaultState = [null, null]) {
  if (!Array.isArray(defaultState) || defaultState.length !== 2)
    defaultState = [null, null];

  const [state, setState] = useState([...defaultState]);

  const reverse = useCallback(
    () => setState((prevState) => [prevState[1], prevState[0]]),
    []
  );

  const setNewState = useCallback(
    (newState, which = null) => {
      if (Array.isArray(newState) && newState.length === 2)
        setState([...newState]);
      else if (which === 1) setState([newState, state[1]]);
      else if (which === 2) setState([state[0], newState]);
    },
    [state[0], state[1]]
  );

  return [[...state], reverse, setNewState];
}
