import React, { useContext } from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";

function RegisteredRoute(props: RouteProps) {
  const { loading, token } = useContext(AccountContext);

  if (loading) {
    return null;
  }

  if (token) {
    return <Route {...props}></Route>;
  }

  return <Redirect to="/register" />;
}

export default RegisteredRoute;
