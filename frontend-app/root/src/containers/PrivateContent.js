import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import CollectionView from "../Views/CollectionView";
import MyCollectionsView from "../Views/MyCollectionsView";
import FlashcardsView from "../Views/FlashcardsView";

export default function PrivateContent() {
  return (
    <div>
      <Switch>
        <Route exact path="/collections" component={MyCollectionsView} />
        <Route
          path="/collections/:name/:id/flashcards"
          component={FlashcardsView}
        />
        <Route path="/collections/:name/:id" component={CollectionView} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}
