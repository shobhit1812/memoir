import { lazy, Suspense } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Browse from "./components/Browse";
import Setting from "./components/Setting";
import Register from "./components/Register";
import EditBlog from "./components/EditBlog";
import CreateBlog from "./components/CreateBlog";
import { createBrowserRouter } from "react-router-dom";
const MyBlogs = lazy(() => import("./components/MyBlogs"));
const DetailedBlog = lazy(() => import("./components/DetailedBlog"));

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
    children: [
      {
        path: "",
        element: <Blogs />,
      },
      {
        path: "my-blogs",
        element: (
          <Suspense>
            <MyBlogs />
          </Suspense>
        ),
      },
      {
        path: "detailed-blog/:title/:id",
        element: (
          <Suspense>
            <DetailedBlog />
          </Suspense>
        ),
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "edit-blog/:title/:id",
        element: <EditBlog />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);

export default App;
