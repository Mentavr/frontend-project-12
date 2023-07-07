import React, { useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/loggerContext.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const logIn = async (values, path) => {
    try {
      const login = await axios.post(path, values);
      localStorage.setItem('userId', JSON.stringify(login.data));
      setLoggedIn(true);
    } catch ({ request }) {
      return request;
    }
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    return setLoggedIn(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
