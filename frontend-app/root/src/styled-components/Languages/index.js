import styled from "styled-components";
import { colors, fontSizes } from "../stylesValues";
import { animated } from "react-spring";

const { mainBlue, mainPurple, mainWhite, mainGreen } = colors;
const { m, l } = fontSizes;

export const LanguagesWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(51, 51, 51, 0.9);
  z-index: 100;
`;

export const SelectLanguagesBtn = styled.button`
  position: relative;
  min-height: 20px;
  border: none;
  padding: 5px;
  margin: 0;
  transform-origin: center;
  z-index: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${mainWhite};
  background-color: #555555;
  & > span {
    display: inline-block;
    position: relative;
    padding: 0 5px;
    transform: translateY(-25%);
    @media (min-width: 674px) {
      transform: translateY(-20%);
    }
  }

  &:hover {
    color: ${mainGreen};
  }

  & > svg {
    width: 25px;
    height: 25px;
    @media (min-width: 674px) {
      width: 30px;
      height: 30px;
    }
  }
  @media (min-width: 674px) {
    padding: 10px;
    min-height: 30px;
    font-size: 20px;
  }
`;

export const SmallerLanguagesBtn = styled(SelectLanguagesBtn)`
  background-color: transparent;
  & > span {
    display: none;
  }
`;

export const StyledLanguagesListWrapper = styled.div``;

export const StyledListsWrapper = styled.div`
  display: flex;
  position: relative;
  text-align: center;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: ${mainWhite};
  width: 90%;
  max-height: 100%;
  overflow-y: scroll;
  font-family: "Lato";
  font-size: 18px;
  @media (min-width: 420px) {
    width: 60%;
  }
`;

export const StyledBtnCloseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
`;
