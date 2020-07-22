import { connect } from "react-redux";
import { setSortBy, toggleOrder } from "../../actions/collections";
import { COLLECTIONS_SORT_OPTIONS } from "../../services/transdict-API/actionsTypes";

function CollectionSorting({ children, setSortBy, toggleOrder, sortBy }) {
  const sortingOptions = COLLECTIONS_SORT_OPTIONS;
  return children({ setSortBy, toggleOrder, sortBy, sortingOptions });
}

const mapStateToProps = (state) => ({
  sortBy: state.collections.sortBy,
  sortDirection: state.collections.sortDirection,
});

const mapDispatchToProps = (dispatch) => ({
  setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
  toggleOrder: () => dispatch(toggleOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionSorting);
