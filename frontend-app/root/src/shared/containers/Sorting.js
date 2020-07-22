import React from "react";
import SortingForm from "../components/SortingForm";

export default function Sorting({
  currentSortBy,
  sortingOptions,
  toggleOrder,
  setSortBy,
}) {
  const handleSetSortBy = (event) => setSortBy(event.target.value);

  const mappedSortingOptions = [...new Set(Object.values(sortingOptions))];

  return (
    <SortingForm
      currentSortBy={currentSortBy}
      handleSetSortBy={handleSetSortBy}
      toggleOrder={toggleOrder}
      mappedSortingOptions={mappedSortingOptions}
    />
  );
}
