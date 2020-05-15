import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticating) return <h2>Loading...</h2>;
        return !auth.isAuthenticated ? (
          <Redirect to="login" />
        ) : (
          <Component {...props} auth={auth} />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
