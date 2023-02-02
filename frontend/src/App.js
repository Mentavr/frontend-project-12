import  FormAtorithation from './FormAtorithation.js';
import  Chat from './Chat.js'
import  ErrorPage from './ErrorPage.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState } from 'react';
import useAuth from './hooks/useAuth.jsx';
import AutorProvide from './context/provider'



const PrivateRoute = ({ children }) => {
  const auth = useAuth();


  return (
    auth.logger ? children : <Navigate to="/login" />
  );
};


function App() {
  return (
    <AutorProvide >
      <Router>
        <Routes>
          <Route path="/login" element={<FormAtorithation />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          </Routes>
      </Router>
    </AutorProvide>
  );
}

export default App;
