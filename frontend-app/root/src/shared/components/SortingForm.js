import React from "react";
import {
  StyledSortingWrapper,
  StyledSortingSelect,
  StyledSortingOption,
  StyledReverseOrderBtn,
} from "../../styled-components/Sorting";

import { ReactComponent as SortReverseSVG } from "../../img/svg/016-right-arrow.svg";

export default function SortingForm({
  sortBy,
  sortDirection,
  handleSortBy,
  toggleOrder,
  mappedSortingOptions,
}) {
  return (
    <StyledSortingWrapper>
      <StyledReverseOrderBtn
        isDesc={sortDirection === "DESC"}
        onClick={toggleOrder}
      >
        <SortReverseSVG />
      </StyledReverseOrderBtn>
      <StyledSortingSelect
        name="sort-by"
        value={sortBy}
        onChange={handleSortBy}
      >
        {mappedSortingOptions.map(([sortValue, sortName]) => (
          <StyledSortingOption value={sortValue}>
            {sortName}
          </StyledSortingOption>
        ))}
      </StyledSortingSelect>
    </StyledSortingWrapper>
  );
}
