import React from "react";
import useAction from "../../shared/hooks/useAction";

export default function WithGetData({ children, data, getData, deps = [] }) {
  useAction(getData, deps);
  return <div>{children(data)}</div>;
}
