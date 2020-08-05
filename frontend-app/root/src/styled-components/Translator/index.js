import styled from "styled-components";
import { colors, fontSizes } from "../stylesValues";
import { animated } from "react-spring";
import { NavLink } from "react-router-dom";

const { mainBlue, mainPurple, mainWhite } = colors;
const { m, l } = fontSizes;

export const StyledMainTranslatorWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
  max-width: 1420px;
  margin: 120px auto;
`;

export const StyledTranslatorShortcutWrapper = styled(
  StyledMainTranslatorWrapper
)`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-height: 200px;
  max-height: 400px;
  max-width: 400px;
  margin: 0px auto;
  & > span {
    display: block;
    min-width: 20px;
    height: 20px;
    padding: 0;
    margin: 0 auto;
  }
`;

export const StyledTranslatorWrapperWithAdding = styled(
  StyledMainTranslatorWrapper
)`
  min-height: 200px;
  max-height: 400px;
  max-width: 1024px;
  margin-bottom: 30px;
  margin: 10px auto;
`;

export const StyledLanguageInputsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

export const StyledLanguageInputsWrapperWithAdding = styled(
  StyledLanguageInputsWrapper
)``;

export const StyledLanguageWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  @media (min-width: 720px) {
    width: 40%;
    min-width: 400px;
  }
`;

export const StyledLanguageOptionsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 20px;
  @media (min-width: 720px) {
    flex-direction: column;
    width: 80%;
  }
`;

export const StyledLanguageWrapperWithAdding = styled(StyledLanguageWrapper)``;

export const StyledReverseBtn = styled.button`
  position: relative;
  width: 45px;
  height: 45px;
  border: none;
  padding: 0;
  margin: 20px;
  transform-origin: center;
  z-index: 0;
  & > svg {
    width: 100%;
    min-width: 45px;
    opacity: ${(props) => (props.disabled ? 0.3 : 1)};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
  @media (min-width: 720px) {
    transform: rotate(90deg);
  }
`;

export const StyledSmallReverseBtn = styled(StyledReverseBtn)`
  height: 25px;
  width: 25px;
  z-index: 0;
  & > svg {
    width: 100%;
    min-width: 25px;
  }
`;

export const StyledCurrentLanguage = styled.p`
  font-size: ${m};
  font-family: "Lato";
  font-weight: 700;
  padding: 10px;
  text-align: center;
  & > span {
    font-weight: 400;
    color: #00acb3;
  }
  @media (min-width: 586px) {
    font-size: ${l};
  }
`;

export const StyledLanguageInput = styled.textarea`
  width: 100%;
  max-width: 400px;
  height: 100px;
  font-family: "Montserrat", sans-serif;
  font-size: ${m};
  background-color: ${mainWhite};
  padding: 20px;
  border: 1px solid #dddddd;
  color: #333333;
  &:disabled {
    background: #fefefe;
    color: #333333;
    border-color: #dddddd;
    cursor: default;
  }
  @media (min-width: 1024px) {
    min-height: 200px;
  }
`;

export const SmallerLanguageInput = styled(StyledLanguageInput)`
  height: 70px;
  @media (min-width: 720px) {
    min-height: 100px;
  }
`;

export const LanguageSelectionWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  align-items: flex-start;
`;

export const SmallestLanguageInput = styled(StyledLanguageInput)`
  position: relative;
  height: 70px;
  transform: translateY(-40%);
  @media (min-width: 720px) {
    min-height: 100px;
    transform: translateY(-20%);
  }
`;

export const StyledAddToCollectionBtn = styled.button`
  position: relative;
  width: 35px;
  height: 35px;
  border: none;
  padding: 0;
  margin: 10px;
  z-index: 0;
  & > svg {
    width: 100%;
    min-width: 35px;
    opacity: ${(props) => (props.disabled ? 0.3 : 1)};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;
