import React, { useState, useEffect, useCallback, useRef } from "react";
import CollectionsList from "../containers/Collection/CollectionsList";
import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

export default function MyCollectionsView() {
  return (
    <div>
      <p>MyCollectionsView</p>
      <CollectionsList />
    </div>
  );
}
