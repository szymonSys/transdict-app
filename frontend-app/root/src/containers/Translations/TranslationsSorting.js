import React from "react";
import SortingForm from "../../shared/components/SortingForm";
import { connect } from "react-redux";
import { setSortBy, toggleOrder } from "../../actions/translations";
import Sorting from "../../shared/components/Sorting";

const TranslationsSorting = ({ component = SortingForm, ...rest }) => (
  <Sorting component={component} {...rest} />
);

const mapStateToProps = (state) => ({
  sortBy: state.translations.sortBy,
  sortDirection: state.translations.sortDirection,
});

const mapDispatchToProps = (dispatch) => ({
  setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
  toggleOrder: () => dispatch(toggleOrder()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslationsSorting);
