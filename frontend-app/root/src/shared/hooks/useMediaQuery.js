import { useEffect, useState } from "react";

export default function useMediaQuery(
  query,
  defaultMatches = window.matchMedia(query).matches
) {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.remveListener(listener);
  }, [query, matches]);

  return matches;
}
