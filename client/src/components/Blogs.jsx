import axios from "axios";
import Shimmer from "./Shimmer";
import BlogsCard from "./BlogsCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/constants/server_url";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

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

  const indexOfLastBlog = currentPage * cardsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - cardsPerPage;
  const currentBlog = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <Shimmer numberOfBlogs={9} />
        ) : (
          <>
            {currentBlog.map((blog) => (
              <BlogsCard key={blog._id} {...blog} />
            ))}
          </>
        )}
      </div>

      <div className="flex justify-center mt-5 space-x-2">
        <Button
          onClick={handlePrevPage}
          className="px-4 py-2"
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          className="px-4 py-2"
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Blogs;
