import React, { useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/loggerContext.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const logIn = async (values, path) => {
    const login = await axios.post(path, values);
    localStorage.setItem('userId', JSON.stringify(login.data));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
