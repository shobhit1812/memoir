import axios from "axios";
import Shimmer from "./Shimmer";
import BlogsCard from "./BlogsCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useOnline from "../utils/hook/useOnline.js";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "@/utils/constants/server_url";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
  const navigate = useNavigate();
  const cardsPerPage = 9;
  const isOnline = useOnline();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const getAllBlogs = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const blogs = await axios.get(`${BASE_URL}/blogs/get-all-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = blogs.data.data;
      setBlogs(response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        console.error("Error fetching blogs:", error.message);
      }
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const indexOfLastBlog = currentPage * cardsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - cardsPerPage;
  const currentBlog = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / cardsPerPage);

  const updateVisiblePages = (newPage) => {
    if (newPage > visiblePages[visiblePages.length - 1]) {
      setVisiblePages((prev) =>
        prev.map((page) => page + 1).filter((page) => page <= totalPages)
      );
    } else if (newPage < visiblePages[0] && newPage > 0) {
      setVisiblePages((prev) =>
        prev.map((page) => page - 1).filter((page) => page >= 1)
      );
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
    updateVisiblePages(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setSearchParams({ page: nextPage });
      updateVisiblePages(nextPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      setSearchParams({ page: prevPage });
      updateVisiblePages(prevPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isOnline)
    return (
      <h1 className="flex p-3 justify-center text-4xl">
        🔴 Offline, Please check your internet
      </h1>
    );

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

        {visiblePages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 ${
              currentPage === page
                ? "bg-blue-900 text-[#fafafa] hover:bg-blue-900"
                : ""
            }}`}
          >
            {page}
          </Button>
        ))}

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
