import axios from "axios";
import Shimmer from "./Shimmer";
import BlogsCard from "./BlogsCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/constants/server_url";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const blogs = await axios.get(`${BASE_URL}/blogs/get-all-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = blogs.data.data;
      setBlogs(response);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.length === 0 ? (
        <>
          {Array(12)
            ?.fill(0)
            ?.map((_, index) => (
              <Shimmer key={index} />
            ))}
        </>
      ) : (
        <>
          {blogs.map((blog) => (
            <BlogsCard key={blog._id} {...blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default Blogs;
