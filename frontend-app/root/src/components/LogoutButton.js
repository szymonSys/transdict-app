import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

function LogoutButton({ logout, isAuthenticated }) {
  return !isAuthenticated ? null : (
    <button type="submit" onClick={logout}>
      Logout
    </button>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(LogoutButton);
