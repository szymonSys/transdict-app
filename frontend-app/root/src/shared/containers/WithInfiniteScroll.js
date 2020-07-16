import React from "react";
import useInfiniteScroll from "../../shared/hooks/useInfiniteScroll";

export default function WithInfiniteScroll({
  children,
  callback,
  shouldExecute,
}) {
  const ref = useInfiniteScroll(callback, shouldExecute);
  return <div>{children(ref)}</div>;
}
