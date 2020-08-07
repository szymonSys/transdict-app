import styled from "styled-components";
import { colors, fontSizes } from "../stylesValues";
import { StyledDeleteBtn as DeleteBtn } from "../Collections";
import { animated } from "react-spring";
import { Link } from "react-router-dom";

const {
  mainBlue,
  mainPurple,
  mainRed,
  mainWhite,
  mainGreen,
  mainYellow,
} = colors;

const { m, l } = fontSizes;

export const StyledTranslationsWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledTranslationsList = styled.div`
  width: 100%;
  min-width: 240px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 100px auto;

  @media (min-width: 470px) {
    margin: 20px auto;
  }

  @media (min-width: 720px) {
    width: 60%;
  }

  @media (min-width: 1024px) {
    width: 40%;
  }
`;

export const StyledCollectionStatsWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  color: white;
  border-radius: 50%;
  @media (min-width: 470px) {
    top: -80px;
    left: 0%;
    transform: translateX(0%);
  }
  @media (min-width: 720px) {
    top: -80px;
    left: 20%;
    transform: translateX(0%);
  }
  @media (min-width: 1024px) {
    top: -80px;
    left: 30%;
    transform: translateX(0%);
  }
`;

export const StyledLearnedPercents = styled.p`
  position: relative;
  transform: translateY(10%);
  font-weight: 700;
  font-size: 26px;
  color: orange;
`;

export const StyledLearnedRatio = styled.p`
  position: relative;
  transform: translateY(10%);
`;

export const StyledIsLearnedLabel = styled.label``;

export const StyledIsLearnedWrapper = styled.div``;

export const HiddenCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Icon = styled.svg`
  position: relative;
  fill: none;
  stroke: white;
  stroke-width: 2px;
  z-index: -1;
`;

export const StyledCheckbox = styled.div`
  position: relative;
  background-color: transparent;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? "#54E360" : "papayawhip")};
  border-radius: 3px;
  transition: all 150ms;
  z-index: 0;
  cursor: pointer;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export const CheckboxContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const CheckboxLabel = styled.span`
  position: relative;
  color: #ffffff;
  font-weight: 700;
  transform: translateY(-30%);
  font-family: "Lato", "sans-serif";
  display: inline-block;
  margin-right: 5px;
`;

export const StyledDeleteBtn = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  top: auto;
  bottom: 20px;
  left: auto;
  right: 20px;
  padding: 0;
  background-color: transparent;
  border: none;
  z-index: 1;
  & > svg {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

export const StyledTranslationItem = styled.div`
  position: relative;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: nowrap;
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  background-color: #21b8ff;
  color: #565656;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.7);
`;

export const StyledTranslationPhrase = styled.p`
  min-height: 40px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;

  & > span {
    display: block;
    font-family: "Lato", "sans-serif";
    color: #ffffff;
    margin-bottom: 5px;
    font-size: 14px;
  }

  &:nth-child(1) {
    padding-bottom: 20px;
    border-bottom: 1px solid #1398d6;
  }

  &:nth-child(2) {
    padding-top: 20px;
  }
`;

export const StyledPhraseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-right: 10px;
  flex-basis: 80%;
`;

export const StyledOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;
  height: 100%;
  flex-basis: 20%;
`;
