import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { authenticate } from "../../actions/auth";

function PrivateRoute({ component: Component, authenticate, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticating) return <h2>Loading...</h2>;
        return !auth.isAuthenticated ? (
          <Redirect to="login" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
