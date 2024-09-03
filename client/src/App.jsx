import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Browse from "./components/Browse";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/browse/:id",
    element: <Browse />,
  },
]);

export default App;
