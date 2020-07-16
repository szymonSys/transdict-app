import React, { useState, useEffect, useCallback, useRef } from "react";

import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import Collection from "../containers/Collection";

export default function CollectionView() {
  return (
    <div>
      <p>Collection menu component</p>
      <p>add translate and add new phrase component</p>
      <p>sorting component</p>
      <p>CollectionView</p>
      <Collection />
    </div>
  );
}
