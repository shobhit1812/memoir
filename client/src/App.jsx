import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Browse from "./components/Browse";
import MyBlogs from "./components/MyBlogs";
import Register from "./components/Register";
import EditBlog from "./components/EditBlog";
import CreateBlog from "./components/CreateBlog";
import DetailedBlog from "./components/DetailedBlog";
import { createBrowserRouter } from "react-router-dom";

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
        element: <MyBlogs />,
      },
      {
        path: "detailed-blog/:title/:id",
        element: <DetailedBlog />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "edit-blog/:title/:id",
        element: <EditBlog />,
      },
    ],
  },
]);

export default App;
