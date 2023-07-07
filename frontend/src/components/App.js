import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filter from 'leo-profanity';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider as ProviderReduce } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from '../slice/index.js';
import ErrorPage from './errorPage/ErrorPage.js';
import i18n from '../i18n.js';
import ModalWraper from './modals/ModalWraper.js';
import Login from './autorizationPage/FormAutorization.js';
import FormRegistration from './registrationPage/FormRegistration.js';
import Chat from './chatPage/Chat.js';
import ApiProvider from './common/ApiProvider.js';
import AuthProvider from './common/AuthProvider.js';
import routes from '../routesSpi.js';
import PrivateRoute from './common/PrivateRoute.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_MY_TOKEN,
  environment: 'testenv',
};

const App = () => {
  const {
    atorithationPath, chatPath, registrationPath, allPath,
  } = routes;
  useEffect(() => {
    filter.add(filter.getDictionary('en'));
    filter.add(filter.getDictionary('ru'));
  }, []);

  return (
    <ProviderReduce store={store}>
      <ApiProvider>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <Provider config={rollbarConfig}>
              <ErrorBoundary>
                <ToastContainer />
                <Router>
                  <Routes>
                    <Route path={chatPath()} element={<PrivateRoute />}>
                      <Route index element={<Chat />} />
                    </Route>
                    <Route
                      path={registrationPath()}
                      element={<FormRegistration />}
                    />
                    <Route path={atorithationPath()} element={<Login />} />
                    <Route path={allPath()} element={<ErrorPage />} />
                  </Routes>
                </Router>
                <ModalWraper />
              </ErrorBoundary>
            </Provider>
          </I18nextProvider>
        </AuthProvider>
      </ApiProvider>
    </ProviderReduce>
  );
};
export default App;
