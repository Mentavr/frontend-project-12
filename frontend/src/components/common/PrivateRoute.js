import React from 'react';
import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import routes from '../../routesSpi.js';

const PrivateRoute = () => {
  const { atorithationPath } = routes;
  const autContext = useAuth();
  return autContext.loggedIn ? <Outlet /> : <Navigate to={atorithationPath()} />;
};

export default PrivateRoute;
