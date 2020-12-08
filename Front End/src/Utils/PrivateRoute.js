import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}
 
export default PrivateRoute;