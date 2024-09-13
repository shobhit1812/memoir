/* eslint-disable react-hooks/exhaustive-deps */
import Blogs from "./Blogs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <div className="scroll-smooth min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />
      <main className="flex-grow">
        {/* Content goes here */}
        <Blogs />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
