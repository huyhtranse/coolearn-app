import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticate() || currentUser) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/not-auth",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    ></Route>
  );
};

export default ProtectedRoute;
