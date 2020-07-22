import useInfiniteScroll from "../../shared/hooks/useInfiniteScroll";

export default function WithInfiniteScroll({
  children,
  callback,
  executionOptions,
}) {
  const [observedRef, isLoading] = useInfiniteScroll(
    callback,
    executionOptions
  );
  return children(observedRef, isLoading);
}
