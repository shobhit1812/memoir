import axios from "axios";
import Shimmer from "./Shimmer";
import BlogsCard from "./BlogsCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/utils/constants/server_url";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user);

  const getMyBlogs = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const blogs = await axios.get(`${BASE_URL}/blogs/get-my-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = blogs.data.data;
      setBlogs(response);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Shimmer numberOfBlogs={3} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogsCard key={blog._id} {...blog} />)
      ) : (
        <div className="col-span-full text-center">
          <p className="text-xl font-semibold">
            {"You haven't written any blogs yet"}
          </p>
          <Link to={`/browse/${user?._id}/create-blog`}>
            <p className="text-blue-600 cursor-pointer">
              Start writing your first blog now!
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
