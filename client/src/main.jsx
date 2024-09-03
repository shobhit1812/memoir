import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./utils/store/store.js";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={App} />
  </Provider>
);
