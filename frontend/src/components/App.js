import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Provider as ProviderReduce } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import store from '../slice/index.js';
import ErrorPage from './ErrorPage.js';
import i18n from '../i18n.js';
import ModalWraper from './modals/ModalWraper.js';
import Login from './FormAutorization.js';
import FormRegistration from './FormRegistration.js';
import Chat from './Chat.js';
import SocketContext from '../context/socketContext.js';
import AuthContext from '../context/loggerContext.js';
import routes from '../routes.js';
import SocketOn from './SocketOn.js';
import useAuth from '../hooks/useAuth.js';

const {
  atorithationPath, chatPath, registrationPath, allPath,
} = routes;
const socket = io();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    return setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const autContext = useAuth();
  return autContext.loggedIn
    ? (children) : (<Navigate to={atorithationPath} state={{ from: location }} />);
};

const rollbarConfig = {
  accessToken: process.env.REACT_APP_MY_TOKEN,
  environment: 'testenv',
};

const App = () => (
  <SocketContext.Provider value={socket}>
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <Provider config={rollbarConfig}>
          <ErrorBoundary>
            <ProviderReduce store={store}>
              <ToastContainer />
              <SocketOn>
                <Router>
                  <Routes>
                    <Route
                      path={chatPath}
                      element={(
                        <PrivateRoute>
                          <Chat />
                        </PrivateRoute>
                      )}
                    />
                    <Route path={atorithationPath} element={<Login />} />
                    <Route
                      path={registrationPath}
                      element={<FormRegistration />}
                    />
                    <Route path={allPath} element={<ErrorPage />} />
                  </Routes>
                </Router>
                <ModalWraper />
              </SocketOn>
            </ProviderReduce>
          </ErrorBoundary>
        </Provider>
      </I18nextProvider>
    </AuthProvider>
  </SocketContext.Provider>
);
export default App;
