import axios from "axios";
import { useEffect, useState } from "react";
import BlogsCard from "./BlogsCard";
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
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="p-5 max-w-screen-lg mx-auto">
      <div className="flex flex-wrap justify-center md:justify-center">
        {blogs.map((blog) => (
          <BlogsCard key={blog._id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
