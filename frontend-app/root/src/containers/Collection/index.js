import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import WithInfiniteScroll from "../../shared/containers/WithInfiniteScroll";
import TranslationItem from "../../components/Translations/TranslationItem";

import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import {
  getTranslations,
  deleteTranslation,
  checkTranslation,
  setLearned,
  setLimit as setTranslationsLimit,
  toggleOrder as toggleTranslationsOrder,
  setSortBy as setTranslationsSortBy,
  toggleMode,
} from "../../actions/translations";

function Collection({
  getTranslations,
  deleteTranslation,
  checkTranslation,
  setTranslationsLimit,
  toggleTranslationsOrder,
  setTranslationsSortBy,
  toggleMode,
  setLearned,
  translations: translationsObject,
  messages,
}) {
  // TODO: add loading state to reducers, add messages, update sort and order reducers with reset translations

  const { name: collectionName, id: collectionId } = useParams();
  const {
    translations,
    collection: { translationsQuantity, learnedQuantity },
  } = translationsObject;

  const checkIfFetchedAddTranslations = () =>
    !translations.length || translations.length < translationsQuantity;

  const [shouldExecute, setShouldExecute] = useState(
    checkIfFetchedAddTranslations()
  );

  useEffect(() => {
    setShouldExecute(checkIfFetchedAddTranslations());
  }, [translations.length, translationsQuantity]);

  return (
    <div>
      <h2>{collectionName}</h2>
      <WithInfiniteScroll
        callback={() => getTranslations(collectionId)}
        shouldExecute={shouldExecute}
      >
        {(ref) => (
          <div>
            {translations.map((translation) => (
              <TranslationItem
                translation={translation}
                handleCheck={checkTranslation}
                handleDelete={deleteTranslation}
              />
            ))}
            <footer ref={ref}>
              <h2>FOOTER</h2>
            </footer>
          </div>
        )}
      </WithInfiniteScroll>
    </div>
  );
}

const mapStateToProps = (state) => ({
  translations: state.translations,
  messages: state.messages,
});
const mapDispatchToProps = (dispatch) => ({
  getTranslations: (collectionId) => dispatch(getTranslations(collectionId)),
  deleteTranslation: (translationId, collectionId) =>
    dispatch(deleteTranslation({ translationId, collectionId })),
  checkTranslation: (translationId, collectionId) =>
    dispatch(checkTranslation({ translationId, collectionId })),
  setTranslationsSortBy: (sortBy) => dispatch(setTranslationsSortBy(sortBy)),
  toggleTranslationsOrder: () => dispatch(toggleTranslationsOrder()),
  setTranslationsLimit: (limit) => dispatch(setTranslationsLimit(limit)),
  toggleMode: () => dispatch(toggleMode()),
  setLearned: (options) => dispatch(setLearned(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
