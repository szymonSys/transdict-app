import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getLanguages } from "../../actions/languages";
import LanguagesList from "../../components/Languages/LanguagesList";

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

const mapStateToProps = (state) => ({ languages: state.languages });
const mapDispatchToProps = (dispatch) => ({
  getLanguages: () => dispatch(getLanguages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
