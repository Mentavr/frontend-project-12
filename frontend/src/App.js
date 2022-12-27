import  FormAtorithation from './FormAtorithation.js';
import  ErrorPage from './ErrorPage.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <FormAtorithation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
