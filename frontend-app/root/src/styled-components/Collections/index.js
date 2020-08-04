import styled from "styled-components";
import { colors, fontSizes } from "../stylesValues";
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

export const StyledCollectionWrapper = styled.div`
  position: relative;
  min-height: 200px;
  width: 100%;
`;

export const StyledCollectionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
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
  min-width: 250px;
  max-width: 600px;
  min-height: 160px;
  max-height: 240px;
  padding: 25px 10px;
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
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledCollectionStatsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  height: 60px;
  width: 60px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 50%;
`;

export const StyledLearnedPercents = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: orange;
`;

export const StyledLearnedRatio = styled.div`
  position: relative;
  transform: translateY(-15%);
`;

export const StyledFlashcardsLinkWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
