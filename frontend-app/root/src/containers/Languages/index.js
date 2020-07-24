import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getLanguages } from "../../actions/languages";

function Languages({ languages, getLanguages, setLanguages }) {
  useEffect(() => {
    getLanguages();
  }, []);

  const sortLanguages = (languages) => {
    if (!languages) return;
    const languagesEntries = Array.from(languages);
    languagesEntries.sort((a, b) => (a[1].name < b[1].name ? -1 : 1));
    return languagesEntries;
  };

  const makeLanguagesList = (entries) => {
    return entries.map((entry) => {
      const [key, value] = entry;
      return (
        <div>
          <p>{key}</p>
          <p>{value?.name}</p>
        </div>
      );
    });
  };

  const sortedLanguagesEntries = useMemo(
    () => sortLanguages(languages.languages),
    []
  );

  return <div>{makeLanguagesList(sortedLanguagesEntries)}</div>;
}

const mapStateToProps = (state) => ({ languages: state.languages });
const mapDispatchToProps = (dispatch) => ({
  getLanguages: () => dispatch(getLanguages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
