import React from "react";
import WithSorting from "../containers/WithSorting";

export default function Sorting({
  component: Component,
  sortBy,
  toggleOrder,
  sortDirection,
  ...rest
}) {
  return (
    <WithSorting {...rest}>
      {({ handleSortBy, mappedSortingOptions }) => (
        <Component
          sortBy={sortBy}
          handleSortBy={handleSortBy}
          mappedSortingOptions={mappedSortingOptions}
          toggleOrder={toggleOrder}
          sortDirection={sortDirection}
        />
      )}
    </WithSorting>
  );
}
