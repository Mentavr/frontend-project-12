import FormAtorithation from "./FormAtorithation.js";
import FormRegistration from "./FormRegistration.js";
import { useEffect } from "react";
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
import ValidationContext from "./context/index.js";
import i18next from "i18next";
import interfaceTranslations from "./translation.js";

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
  const translation = i18next.createInstance();
  translation.init(interfaceTranslations);
  return (
    <ValidationContext.Provider value={translation}>
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
    </ValidationContext.Provider>
  );
};

export default App;
