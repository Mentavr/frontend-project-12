import FormAtorithation from "./FormAtorithation.js";
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

const PrivateRoute = ({ children }) => {
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
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
