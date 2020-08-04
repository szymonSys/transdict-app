import styled from "styled-components";
import { colors, fontSizes } from "../stylesValues";
import { animated } from "react-spring";

const {
  mainBlue,
  mainPurple,
  mainRed,
  mainWhite,
  mainGreen,
  mainYellow,
} = colors;
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
  position: relative;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
`;

export const StyledCloseBtn = styled.button`
  position: fixed;
  transform: translate(80%, 80%);
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 10px;
  &:disabled {
    background-color: transparent;
  }
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export const StyledAutoTranslationBtn = styled.button`
  margin: 0 auto;
  padding: 10px 15px;
  background-color: ${mainWhite};
  color: ${mainPurple};
  border: 1px solid ${mainPurple};
  &:disabled {
    color: #bbbbbb;
    background-color: transparent;
    border-color: #bbbbbb;
  }
  &:hover {
    color: ${(props) => (props.disabled ? "#bbbbbb" : mainWhite)};
    background-color: ${(props) => (props.disabled ? mainWhite : mainPurple)};
    border-color: ${(props) => (props.disabled ? "#bbbbbb" : mainWhite)};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

export const StyledListHeader = styled.p`
  font-family: "Raleway", sans-serif;
  margin: 30px auto 20px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ which }) => (which === 2 ? "#00acb3" : "#00ab5e")};
`;

export const StyledLanguageItem = styled.li`
  margin: 0 10px 20px;
  cursor: pointer;
  font-size: ${({ isCurrent }) => (isCurrent ? "20px" : "inherit")};
  font-weight: ${({ isCurrent }) => (isCurrent ? 700 : 400)};
`;

export const StyledLanguageList = styled.ul`
  padding: 10px 10px 20px;
`;
