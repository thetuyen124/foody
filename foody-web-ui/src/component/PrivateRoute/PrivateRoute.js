import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { isExpired } from "react-jwt";
import MainContext from "../../context/mainContext";

const PrivateRoute = (props) => {
  const { token } = useContext(MainContext);
  const condition = token === null 
  // || isExpired(token);
  return !condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
