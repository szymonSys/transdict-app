import React from "react";
import SortingForm from "../../shared/components/SortingForm";
import { connect } from "react-redux";
import { setSortBy, toggleOrder } from "../../actions/collections";
import Sorting from "../../shared/components/Sorting";

const CollectionSorting = ({ component = SortingForm, ...rest }) => (
  <Sorting component={component} {...rest} />
);

const mapStateToProps = (state) => ({
  sortBy: state.collections.sortBy,
  sortDirection: state.collections.sortDirection,
});

const mapDispatchToProps = (dispatch) => ({
  setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
  toggleOrder: () => dispatch(toggleOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionSorting);
