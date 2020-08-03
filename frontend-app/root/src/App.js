import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import PrivateRoute from "./shared/components/PrivateRoute";
import LoginView from "./Views/LoginView";
import RegisterView from "./Views/RegisterView";
import TranslatorView from "./Views/TranslatorView";
import NavigationView from "./Views/NavigationView";
import LoadingView from "./shared/components/LoadingView";
import PrivateContent from "./containers/PrivateContent";
import useAuthentication from "./shared/hooks/useAutentication";
import GlobalStyles from "./styled-components/GlobalStyles";

function App() {
  const [isAuthenticating] = useAuthentication();

  return (
    <>
      <GlobalStyles />
      <div className="App">
        <NavigationView />
        {!isAuthenticating ? (
          <LoadingView />
        ) : (
          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/sign-up" component={RegisterView} />
            <Route exact path="/translator" component={TranslatorView} />
            <PrivateRoute path="/" component={PrivateContent} />
            <Redirect to="/translator" />
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
