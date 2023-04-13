import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Provider as ProviderReduce, useSelector } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './slice/index.js';
import ErrorPage from './ErrorPage';
import i18n from './i18n';
import ModalWraper from './ModalWraper';
import FormAtorithation from './FormAtorithation';
import FormRegistration from './FormRegistration';
import Chat from './Chat';

const PrivateRoute = ({ children }) => {
  const logger = useSelector((state) => state.logger.authLogger);
  const location = useLocation();

  return logger ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const rollbarConfig = {
  accessToken: 'c86ec99fa46146649a64bb0835a41ac4',
  environment: 'testenv',
};

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <ProviderReduce store={store}>
          <ToastContainer />
          <Router>
            <Routes>
              <Route
                path="/"
                element={(
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                  )}
              />
              <Route path="/login" element={<FormAtorithation />} />
              <Route path="/signup" element={<FormRegistration />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
          <ModalWraper />
        </ProviderReduce>
      </ErrorBoundary>
    </Provider>
  </I18nextProvider>
);

export default App;
