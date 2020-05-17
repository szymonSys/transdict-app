import React, { useState } from "react";
import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  useSubmit,
  useValue,
  useCheck,
} from "../../shared/hooks/useControlledForm";

import { useTimeout } from "../../shared/hooks/useTime";
import useSwitch from "../../shared/hooks/useSwitch";
import { translate } from "../../actions/phrases";
import { connect } from "react-redux";

function Translator({ translate, phrase }) {
  const location = useLocation();
  const [languages, reverseLanguages, setLanguages] = useSwitch([
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]);

  return (
    <div>
      {console.log(phrase)}
      <button onClick={reverseLanguages}>switch</button>
      <button
        onClick={() =>
          setLanguages([
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
          ])
        }
      >
        setLanguage
      </button>
      <h2>
        {languages[0]} {languages[1]}
      </h2>
      <p>Translator</p>
      <button onClick={() => translate("cześć", { to: "en" })}>
        translate
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({ phrase: state.phrases });
const mapDispatchToProps = (dispatch) => ({
  translate: (text, options) => dispatch(translate(text, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Translator);
