import { useMemo } from "react";
import {
  compose,
  getEntriesFromListAndObjectValues,
  getUniqueListofObjectValues,
  mixObjects,
} from "../utils";

import { SORTING_VALUES as sortingValues } from "../../services/transdict-API/actionsTypes";

export default function WithSorting({
  children,
  setSortBy,
  sortingOptionsObjects,
}) {
  const handleSortBy = (event) => setSortBy(event.target.value);

  const mappedSortingOptions = useMemo(
    () =>
      compose(
        getEntriesFromListAndObjectValues,
        getUniqueListofObjectValues,
        mixObjects
      )(sortingOptionsObjects)(sortingValues),
    []
  );

  return children({
    handleSortBy,
    mappedSortingOptions,
  });
}
