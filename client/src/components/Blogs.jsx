import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "@/utils/constants/server_url";

const Blogs = () => {
  const getAllBLogs = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const blogs = await axios.get(`${BASE_URL}/blogs/get-all-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = blogs.data;
      console.log(response);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getAllBLogs();
  }, []);

  return <div>Hello</div>;
};

export default Blogs;
