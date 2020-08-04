import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { checkType, isNaN } from "../../shared/utils";
import {
  StyledCollectionItem,
  StyledDeleteBtn,
  StyledLink,
  StyledCreatedAt,
  StyledCollectionStatsWrapper,
  StyledLearnedPercents,
  StyledLearnedRatio,
  StyledFlashcardsLinkWrapper,
} from "../../styled-components/Collections";
import { ReactComponent as DeleteSVG } from "../../img/svg/007-delete.svg";

export default function CollectionItem({
  collection,
  deleteBtnRef,
  url,
  isTop,
  isOdd,
}) {
  const {
    name,
    id,
    createdAt,
    updatedAt,
    translationsQuantity,
    learnedQuantity,
  } = collection;

  const date = new Date(createdAt);

  return (
    <StyledCollectionItem isOdd={isOdd} isTop={isTop}>
      <StyledLink to={url}>
        <span>{name}</span>
      </StyledLink>
      <StyledFlashcardsLinkWrapper>
        <Link to={`${url}/flashcards`}>learn</Link>
      </StyledFlashcardsLinkWrapper>
      {checkType("number", learnedQuantity, translationsQuantity) &&
      !isNaN(learnedQuantity) &&
      !isNaN(translationsQuantity) ? (
        <StyledCollectionStatsWrapper>
          <StyledLearnedPercents>{`${
            translationsQuantity
              ? ((learnedQuantity / translationsQuantity) * 100).toFixed()
              : 0
          }%`}</StyledLearnedPercents>
          <StyledLearnedRatio>
            {learnedQuantity}/{translationsQuantity}
          </StyledLearnedRatio>
        </StyledCollectionStatsWrapper>
      ) : (
        <StyledCollectionStatsWrapper />
      )}
      <StyledCreatedAt>{date.toLocaleDateString()}</StyledCreatedAt>
      <StyledDeleteBtn ref={deleteBtnRef}>
        <DeleteSVG />
      </StyledDeleteBtn>
    </StyledCollectionItem>
  );
}
