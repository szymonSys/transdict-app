import styled from "styled-components";
import { colors, fontSizes } from "../stylesValues";

export const StyledSortingWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

export const StyledSortingSelect = styled.select`
  height: 40px;
  padding: 5px;
  font-size: 16px;
  font-family: "Lato", sans-serif;
  cursor: pointer;
`;

export const StyledSortingOption = styled.option``;

export const StyledReverseOrderBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  position: relative;
  background-color: transparent;
  border: none;
  padding: 0;
  & > svg {
    width: 100%;
    height: 100%;
    transform: ${({ isDesc }) => (isDesc ? "rotate(90deg)" : "rotate(-90deg)")};
  }
`;
