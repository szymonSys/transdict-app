import React from "react";
import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import PrivateRoute from "./shared/components/PrivateRoute";
import LoginView from "./Views/LoginView";
import RegisterView from "./Views/RegisterView";
import TranslatorView from "./Views/TranslatorView";
import AppBar from "./Views/AppBar";
import NavigationView from "./Views/NavigationView";
import LoadingView from "./shared/components/LoadingView";
import PrivateContent from "./containers/PrivateContent";
import { useAuthentication } from "./shared/hooks";

function App() {
  const isAuthenticating = useAuthentication();

  return (
    <div className="App">
      <AppBar />
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
  );
}

export default App;
