import React from "react";
import CollectionWrapper from "../containers/Collection/CollectionWrapper";
import TranslationsSorting from "../containers/Translations/TranslationsSorting";
import Sorting from "../shared/containers/Sorting";
import TranslatorWithSwitchLanguages from "../containers/Translator/TranslatorWithSwitchLanguages";
import TranslatorWrapperWithAdding from "../components/Translator/TranslatorWrapperWithAdding";
import AddToCollection from "../containers/Translations/AddToCollection.js";

import { useParams, useRouteMatch, Link } from "react-router-dom";

export default function CollectionView() {
  const { name: collectionName } = useParams();
  const { url } = useRouteMatch();

  return (
    <div>
      <p>Collection menu component</p>
      <p>add translate and add new phrase component</p>
      <h1>{collectionName}</h1>
      <Link to={`${url}/flashcards`}>{"learn ->"}</Link>

      <TranslatorWithSwitchLanguages
        Translator={TranslatorWrapperWithAdding}
        // AddToCollection={AddToCollection}
      />

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
      <CollectionWrapper />
    </div>
  );
}
