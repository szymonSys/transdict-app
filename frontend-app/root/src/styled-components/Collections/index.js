import styled from "styled-components";
import { colors, fontSizes } from "../stylesValues";
import { animated } from "react-spring";
import { Link } from "react-router-dom";
import { StyledLoadingBar as LoadingBar } from "../Collections";
import { StyledCheckbox, CheckboxContainer } from "../Translations";

const {
  mainBlue,
  mainPurple,
  mainRed,
  mainWhite,
  mainGreen,
  mainYellow,
} = colors;

const { m, l } = fontSizes;

export const StyledCollectionWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;

export const StyledCollectionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 40px;

  @media (min-width: 720px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (min-width: 830px) {
    justify-content: flex-start;
  }
`;

export const StyledCollectionItem = styled.div`
  position: relative;
  width: 90%;
  min-width: 240px;
  max-width: 600px;
  min-height: 160px;
  max-height: 240px;
  padding: 30px 10px 0;
  margin: 20px;
  color: #333333;
  background-color: ${({ isOdd }) => (isOdd ? mainGreen : mainBlue)};
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.7);
  overflow: hidden;

  &:hover {
    & > a {
      color: orange;
    }
  }

  @media (min-width: 720px) {
    width: 45%;
    background-color: ${({ isTop }) => (isTop ? mainGreen : mainBlue)};
  }

  @media (min-width: 1200px) {
    width: 30%;
    background-color: ${({ isOdd }) => (isOdd ? mainGreen : mainBlue)};
  }
`;

export const StyledDeleteBtn = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
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

export const StyledLink = styled(Link)`
  font-family: "Raleway", "sans-serif";
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  padding-bottom: 10px;
  transition: 0.2s;
  @media (min-width: 720px) {
    font-size: 28px;
  }
`;

export const StyledCreatedAt = styled.p`
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  color: #555555;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledCollectionStatsWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 60px;
  width: 60px;
  display: flex;
  flex-direction: column;
  padding: 10px 0 5px;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 0px 30px 0px 0px;
`;

export const StyledLearnedPercents = styled.div`
  position: relative;
  transform: translate(-5%, 10%);
  font-size: 22px;
  font-weight: 600;
  color: orange;
`;

export const StyledLearnedRatio = styled.div`
  position: relative;
  transform: translate(-20%, 0);
`;

export const StyledFlashcardsLinkWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: orange;
  padding: 5px;
  background-color: #ffffff;
  text-decoration: underline;
  border-bottom-left-radius: 10px;
`;

export const StyledLoadingBar = styled.p`
  position: relative;
  transform: translateY(-60%);
  min-height: 50px;
  width: 100%;
  font-family: "Lato", "sans-serif";
  font-size: 42px;
  font-weight: 600;
  color: #444444;
  text-align: center;
`;

export const StyledInfoBar = styled.p`
  margin: 40px 0 20px;
`;

export const StyledCollectionSectionWrapper = styled.div`
  position: relative;
  min-height: 200px;
  height: 16vh;
  max-width: 500px;
  min-width: 260px;
  width: 80%;
  margin-top: 20px;
  background-color: #444444;
  padding: 15px;
  color: #ffffff;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.7);

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    background: #555555;
  }

  &::-webkit-scrollbar-thumb {
    background: #dddddd;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #cccccc;
  }
`;

export const StyledCloseBtn = styled.button`
  height: 30px;
  width: 30px;
  padding: 0;
  margin-bottom: 20px;
  border: 1px solid #000000;
  border-radius: 50%;
  background-color: #dddddd;
  & > svg {
    height: 100%;
    width: 100%;
  }
`;

export const AddCollectionWrapper = styled.div`
  padding: 5px;
  margin: 20px auto;
  background-color: ${({ isHidden }) => (isHidden ? "transparent" : "#333333")};
`;

export const AddColectionInputWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StyledAddInput = styled.input.attrs({
  type: "text",
})`
  width: 60%;
  min-width: 220px;
  max-width: 480px;
  padding: 10px;
  background-color: #dddddd;
  font-size: 16px;
  font-family: "Montserrat", "sans-serif";
`;

export const StyledAddCollectionBtn = styled.button`
  color: #eeeeee;
  padding: 10px 15px;
  margin: 10px;
  background-color: #555555;
  border: 1px solid #00ab5e;
  transition: 100ms;
  &:hover {
    color: #00ab5e;
  }
`;

export const StyledNewCollectionBtn = styled.button`
  margin: 10px auto;
  color: ${({ isHidden }) => (!isHidden ? "#111111" : "#eeeeee")};
  width: ${({ isHidden }) => (!isHidden ? "30px" : "auto")};
  height: ${({ isHidden }) => (!isHidden ? "30px" : "auto")};
  padding: ${({ isHidden }) => (!isHidden ? "5px" : "10px 15px")};
  border: ${({ isHidden }) =>
    !isHidden ? "1px solid #111111" : "1px solid #eeeeee"};
  background-color: ${({ isHidden }) => (!isHidden ? "#dddddd" : "#333333")};
  border-radius: ${({ isHidden }) => (isHidden ? "0px" : "50%")};
  &:hover {
    color: #ffffff;
  }
  & > svg {
    position: relative;
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }
`;

export const StyledCollectionsList = styled.ul``;

export const StyledLoading = styled(LoadingBar)`
  color: #dddddd;
`;

export const SyledCollectionItem = styled.li`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 5px;
  margin: 20px 0;
`;

export const StyledCollectionName = styled.p`
  font-size: 20px;
  flex-basis: 90%;
  padding-left: 10px;
`;

export const StyledCollectionCheckbox = styled(StyledCheckbox)`
  width: 30px;
  height: 30px;
  background: ${(props) => (props.checked ? "#00ACB3" : "#eeeeee")};
`;

export const StyledCheckboxContainer = styled(CheckboxContainer)`
  flex-basis: 10%;
  position: relative;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
`;
