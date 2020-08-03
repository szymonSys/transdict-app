import React from "react";
import TranslationsFromCollection from "../containers/Translations/TranslationsFromCollection";
import TranslationsSorting from "../containers/Translations/TranslationsSorting";
import Sorting from "../shared/containers/Sorting";
import TranslatorWithSwitchLanguages from "../containers/Translator/TranslatorWithSwitchLanguages";
import TranslatorWrapperWithAdding from "../components/Translator/TranslatorWrapperWithAdding";
import { useParams, useRouteMatch, Link } from "react-router-dom";

export default function CollectionView() {
  const { name: collectionName } = useParams();
  const { url } = useRouteMatch();

  return (
    <div>
      <h1>{collectionName}</h1>
      <Link to={`${url}/flashcards`}>{"learn ->"}</Link>

      <TranslatorWithSwitchLanguages Translator={TranslatorWrapperWithAdding} />

      <TranslationsSorting>
        {({ setSortBy, toggleOrder, sortBy, sortingOptions }) => (
          <Sorting
            currentSortBy={sortBy}
            sortingOptions={sortingOptions}
            toggleOrder={toggleOrder}
            setSortBy={setSortBy}
          />
        )}
      </TranslationsSorting>
      <TranslationsFromCollection />
    </div>
  );
}
