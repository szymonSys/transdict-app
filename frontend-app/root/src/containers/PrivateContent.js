import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import CollectionView from "../Views/CollectionView";
import MyCollectionsView from "../Views/MyCollectionsView";
import FlashcardsView from "../Views/FlashcardsView";

export default function PrivateContent({ auth }) {
  return (
    <div>
      <Switch>
        <Route exact path="/collections" component={MyCollectionsView} />
        <Route exact path="/collections/:name" component={CollectionView} />
        <Route
          exact
          path="/collections/:name/flashcards/:id"
          component={FlashcardsView}
        />
      </Switch>
    </div>
  );
}
