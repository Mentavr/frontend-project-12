import React from "react";
import useAuth from '../../hooks/useAuth.js';
import {
    Navigate,
    Outlet,
  } from 'react-router-dom';
import routes from '../../routesSpi.js';


const PrivateRoute = () => {
    const {atorithationPath} = routes;
    const autContext = useAuth();
    return autContext.loggedIn ? <Outlet /> : <Navigate to={atorithationPath()} /> 
  };

export default PrivateRoute;