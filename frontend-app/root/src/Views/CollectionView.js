import React, { useState, useEffect, useCallback, useRef } from "react";

import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  Link,
} from "react-router-dom";

import CollectionWrapper from "../containers/Collection/CollectionWrapper";

export default function CollectionView() {
  const { name: collectionName } = useParams();
  const { url } = useRouteMatch();

  return (
    <div>
      <p>Collection menu component</p>
      <p>add translate and add new phrase component</p>
      <h1>{collectionName}</h1>
      <Link to={`${url}/flashcards`}>{"learn ->"}</Link>
      <p>sorting component</p>
      <CollectionWrapper />
    </div>
  );
}
