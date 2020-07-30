import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

export default function useRedirection(defaultPath = "/") {
  const [path, setPath] = useState(defaultPath);
  const history = useHistory();

  const redirect = useCallback((state = {}) => history.push(path, state), [
    path,
  ]);

  return [redirect, setPath];
}
