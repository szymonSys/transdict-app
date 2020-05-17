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

export default function Translator(props) {
  const location = useLocation();
  const [languages, reverseLanguages, setLanguages] = useSwitch([
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]);

  return (
    <div>
      {console.log("render")}
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
    </div>
  );
}
