import React, { useRef, useEffect } from "react";

import {
  CHECK_TRANSLATION,
  DELETE_TRANSLATION,
} from "../../services/transdict-API/actionsTypes";

import TranslationItem from "../../components/Translations/TranslationItem";

export default function Translation({ translation }) {
  const deleteBtnRef = useRef();
  const checkBtnRef = useRef();

  useEffect(() => {
    deleteBtnRef.current.dataset.translationId = translation.id;
    deleteBtnRef.current.dataset.action = DELETE_TRANSLATION;
    checkBtnRef.current.dataset.translationId = translation.id;
    checkBtnRef.current.dataset.action = CHECK_TRANSLATION;
  }, []);

  return (
    <TranslationItem
      translation={translation}
      deleteBtnRef={deleteBtnRef}
      checkBtnRef={checkBtnRef}
    />
  );
}
