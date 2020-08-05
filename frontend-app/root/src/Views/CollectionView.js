import React from "react";
import TranslationsFromCollection from "../containers/Translations/TranslationsFromCollection";
import TranslationsSorting from "../containers/Translations/TranslationsSorting";
import TranslatorWithSwitchLanguages from "../containers/Translator/TranslatorWithSwitchLanguages";
import TranslatorWrapperWithAdding from "../components/Translator/TranslatorWrapperWithAdding";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { TRANSLATIONS_SORT_OPTIONS } from "../services/transdict-API/actionsTypes";

export default function CollectionView() {
  const { name: collectionName } = useParams();
  const { url } = useRouteMatch();

  return (
    <div>
      <h1>{collectionName}</h1>
      <Link to={`${url}/flashcards`}>{"learn ->"}</Link>
      <TranslatorWithSwitchLanguages Translator={TranslatorWrapperWithAdding} />
      <TranslationsSorting sortingOptionsObjects={TRANSLATIONS_SORT_OPTIONS} />
      <TranslationsFromCollection />
    </div>
  );
}
