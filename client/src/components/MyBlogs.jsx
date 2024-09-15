import axios from "axios";
import BlogsCard from "./BlogsCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/constants/server_url";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

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
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogsCard key={blog._id} {...blog} />
      ))}
    </div>
  );
};

export default MyBlogs;
