import { useEffect } from "react";
import useRedirection from "../hooks/useRedirection";

export default function WithRedirection({
  children,
  targetPath,
  redirectionState,
  redirectionDep,
  didMountCallback,
}) {
  const [redirect] = useRedirection(targetPath);

  useEffect(() => {
    redirectionDep && didMountCallback();
  }, []);

  useEffect(() => {
    redirectionDep && redirect(redirectionState);
  }, [redirectionDep]);

  return children();
}
