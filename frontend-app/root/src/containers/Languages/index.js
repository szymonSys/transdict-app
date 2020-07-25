import { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getLanguages } from "../../actions/languages";

function Languages({ children, languages, getLanguages }) {
  useEffect(() => {
    getLanguages();
  }, []);

  const sortLanguages = (languages) => {
    if (!languages) return;
    const languagesEntries = Array.from(languages);
    languagesEntries.sort((a, b) => (a[1].name < b[1].name ? -1 : 1));
    return languagesEntries;
  };

  const sortedLanguagesEntries = useMemo(
    () => sortLanguages(languages.languages),
    []
  );

  return children({ sortedLanguagesEntries });
}

const mapDispatchToProps = (dispatch) => ({
  getLanguages: () => dispatch(getLanguages()),
});

export default connect(null, mapDispatchToProps)(Languages);
