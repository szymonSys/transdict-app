import React from "react";

export default function SortingForm({
  currentSortBy,
  handleSetSortBy,
  toggleOrder,
  mappedSortingOptions,
}) {
  return (
    <div>
      <select name="sort-by" value={currentSortBy} onChange={handleSetSortBy}>
        {mappedSortingOptions.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
      <button onClick={toggleOrder}>Toggle order</button>
    </div>
  );
}
