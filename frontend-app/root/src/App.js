import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import PrivateRoute from "./shared/components/PrivateRoute";
import LoginView from "./Views/LoginView";
import RegisterView from "./Views/RegisterView";
import TranslatorView from "./Views/TranslatorView";
import PrivateContent from "./containers/PrivateContent";
import { useAuthentication } from "./shared/hooks";
import LogoutButton from "./components/LogoutButton";

function App() {
  const isAuthenticated = useAuthentication();

  return (
    <div className="App">
      <LogoutButton />
      {!isAuthenticated ? (
        <h2>Waiting...</h2>
      ) : (
        <Switch>
          <PrivateRoute exact path="/" component={PrivateContent} />
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/sign-up" component={RegisterView} />
          <Route exact path="/translator" component={TranslatorView} />
          <Redirect to="/translator" />
        </Switch>
      )}
    </div>
  );
}

export default App;
