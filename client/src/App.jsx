import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default App;
