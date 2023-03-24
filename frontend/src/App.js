import FormAtorithation from "./FormAtorithation.js";
import FormRegistration from "./FormRegistration.js";
import Chat from "./Chat.js";
import ErrorPage from "./ErrorPage.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { store } from "./slice/index";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const PrivateRoute = ({ children }) => {

  localStorage.getItem("userId")
  const logger = useSelector((state) => state.logger.authLogger);
  const location = useLocation();

  return logger ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  return (
   <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<FormAtorithation />} />
          <Route path="/signup" element={<FormRegistration />} />
        </Routes>
      </Router>
    </Provider>
    </I18nextProvider>
  );
};

export default App;
