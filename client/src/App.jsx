import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Browse from "./components/Browse";
import MyBlogs from "./components/MyBlogs";
import Register from "./components/Register";
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
    ],
  },
]);

export default App;
